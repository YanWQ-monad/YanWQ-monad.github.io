---
title: 浅谈 Minecraft 种子逆向
permalinks: Minecraft-seed-cracking
date: 2020-11-11 14:00:00
---

这篇文章理论上应该在一年前写的，奈何一直咕咕咕，就拖到了现在。这几天有点时间，挤一挤把这玩意写一下。

之前在 MCBBS 上看到了这么一篇文章：[地图种子逆向工程技巧：分区暴力搜索](https://www.mcbbs.net/thread-816891-1-1.html)（甚至现在还在首页），于是有感而发研究了一下。

<!-- more -->

> 有感而发（✕），被激将了（✓）
>
> 真实情况：
>
> 由于文章里有这么一句话：  
> “*由于本文内容疑似涉及作弊，在此我不会给出与实际计算地图种子相关的代码，仅解释技术原理*”  
> 我：我\*，居然不给代码。你不让我实现，我偏要把它写出来，学 OI 的人最不缺的就是代码实现能力（大概吧）
>
> 而且那时也在玩服务器，刚好可以拿来开刀。

# 前置技能

- Java 代码阅读
- Minecraft 代码逆向

# How to

一个非常显然的想法就是枚举所有的 $2^{64}$ 个种子，然后每一个都跟地图比较一下。这样子理论上是可以的，但是实际上是不可行的。假设你每秒钟能生成出 1000 张地图（实际上可能更慢，参考 Minecraft 的地图生成速度），那么检测完所有的 $2^{64}$ 个种子需要高达 6 亿年。

然后，~~另一个自然的想法就是~~，我们没必要精准比较，我们可以比较地图的特征。

Minecraft 地图有很多东西都是与种子有关的，比如最明显的生物群系、村庄、矿物之类的。通过这些不同的特征，我们可以逐个排除不可能的种子，最后剩下的就是符号条件的种子。并且，为了达到最高效率，枚举种子可以从容易实现（容易用代码复现）、运行快的特征开始，筛选排除不可能的种子，再用其它特征去判断。

也就是说，我们需要找到尽可能满足这些条件的算法：

- **运行快**。比如说，生成生物群系需要迭代大约 45 层[^1]，每层都要做复杂的变换；相比之下，检查一个埋藏的宝藏就只需要测试一个随机数是否小于 `0.005` 即可。
- **效率高**。有的特征（例如埋藏的宝藏）的生成只与种子二进制位的低 48 位有关，这样我们就可以只遍历 $2^{48}$ 个种子就可以了，效率高了不少。当然在这之后，对于高 16 位还要用其它算法来进行进一步筛选。
- 其它。比如这个算法是否好写（比如生成生物群系那个我就不想写）、这个特征在地图中是否容易收集（比如林地府邸就很难找，当然相对的这一个信息能排除掉的种子会更多）等。

当然，实际中我们要结合几种算法综合使用，快速排除掉不符合的种子。

## Scattered Feature

Minecraft 常见的自然建筑，如女巫小屋、沙漠神殿等，都属于 Scattered Feature，它们的生成算法相同，只是参数有所改动。村庄的生成算法跟 Scattered Feature 相同，然而它在源码里不属于 Scattered Feature（虽然我也不知道为什么）。

Scattered Feature 的生成由三个参数控制：`Spacing`, `Separation`, `RandomSalt`。

在讲 Scattered Feature 的具体生成算法之前，先来说一下 Scattered Feature 的分布特征。

![Scattered Feature Layout](scattered_feature_layout.png)

如上图所示，地图中所有的区块被分成了若干个大小为 $\texttt{Spacing} \times \texttt{Spacing}$ 的正方形。每个正方形中，又只有左上角 $(\texttt{Spacing} - \texttt{Separation}) \times (\texttt{Spacing} - \texttt{Separation})$ 的部分可以生成建筑（$\texttt{Separation}$ 部分不生成建筑）。对于可以生成建筑的部分（绿色部分），会根据种子选择其中的一个区块，在其中尝试生成建筑。

具体这个区块是怎么选择的呢，我们来看一下代码（注：代码基于 Minecraft 1.14.4，代码为了可读性已作略微修改）：

``` java
// net.minecraft.world.level.levelgen.feature.RandomScatteredFeature

// 获得区块 (chunk_x, chunk_z) 所在区域内的，可以尝试生成建筑的区块。
protected ChunkPos getPotentialFeatureChunkFromLocationWithOffset(ChunkGenerator<?> chunkGenerator, Random random, int chunk_x, int chunk_z) {
    int spacing = this.getSpacing(chunkGenerator);
    int separation = this.getSeparation(chunkGenerator);

    int x = chunk_x < 0 ? chunk_x - spacing + 1 : chunk_x;
    int y = chunk_z < 0 ? chunk_z - spacing + 1 : chunk_z;
    x /= spacing;
    y /= spacing;
    ((WorldgenRandom)random).setLargeFeatureWithSalt(chunkGenerator.getSeed(), x, y, this.getRandomSalt());
    x *= spacing;
    y *= spacing;
    return new ChunkPos(x + random.nextInt(spacing - separation),
    	                y + random.nextInt(spacing - separation));
}

// 判断区块 (chunk_x, chunk_z) 可不可以生成建筑（如果为 true 则一定会生成）。
public boolean isFeatureChunk(ChunkGenerator<?> chunkGenerator, Random random, int chunk_x, int chunk_z) {
    ChunkPos chunkPos = this.getPotentialFeatureChunkFromLocationWithOffset(chunkGenerator, random, chunk_x, chunk_z);
    return chunk_x == chunkPos.x && chunk_z == chunkPos.z // Line A
    	&& chunkGenerator.isBiomeValidStartForStructure(chunkGenerator.getBiomeSource().getBiome(new BlockPos(chunk_x * 16 + 9, 0, chunk_z * 16 + 9)), this);
}

// net.minecraft.world.level.levelgen.WorldgenRandom
public long setLargeFeatureWithSalt(long world_seed, int x, int y, int salt) {
    long seed = (long)x * 341873128712L + (long)y * 132897987541L + world_seed + (long)salt;
    this.setSeed(seed);
    return seed;
}
```

注意到 `isFeatureChunk` 中有一个 `isBiomeValidStartForStructure`，这是用来判断这个区块的生物群系是否允许生成这个建筑（例如女巫小屋只能在沼泽生成）。因为生物群系的生成过于复杂，所以在实际实现中可以忽略检查生物群系，虽然会降低一点点效率，但是也不会意外排除合法的种子，权衡之下，这是可取的。

剩下的事就是模拟一下这个生成算法就可以枚举种子了。

### 优化

虽然说 `Random` 只用到了种子的低 48 位[^2]，但是枚举 $2^{48}$ 个种子还是有点困难。

根据上面那篇文章[^3]所说，`Random.nextInt(24) % 8` 取随机数时，所得的结果只与种子的低 20 位有关。这样我们只需要找符号 $\texttt{Spacing} - \texttt{Separation} = 24$ 的建筑（比如村庄），用这个方法加速破解即刻。

关于这个结论的证明，可以在“USTC Hackergame 2020 超迷你的挖矿模拟器”的题解[^4]中找到。并且根据这篇题解所说，这个结论可以扩展至 `Random.nextInt() % 16` 取随机数时，所得的结果只与种子的低 20 位有关。这样的话，只要是符合 $\texttt{Spacing} - \texttt{Separation} \equiv 0 \mod 16$ 的建筑即刻。如果是村庄（$\texttt{Spacing} - \texttt{Separation} = 24$），我们可以把模数下放至 8，这样一样可以加速（当然会有一点效率损失，但是可以忽略不计）。

用这个方法把低 20 位挖出来之后，再用上面的方法把低 21\~48 位筛出来即可。

## 生物群系

要获取种子的高 16 位，比较好的方法就是用生物群系。~~但是生物群系生成那么复杂，手写是不可能手写的~~，于是我就找到了（~~白嫖~~）一个现成的库：[cubiome](https://github.com/Cubitect/cubiomes)。

把这个库魔改一下，枚举 $2^{16}$ 个种子，检查生物群系是不是符合现有的地图即可。

<div class="tip">
值得注意的是，Minecraft 的生物群系是精确到一个方块（平面上的一个方块）的，而不是像 Chunkbase 显示的一个区块。
</div>

# 代码

~~我知道你们都想白嫖代码~~

这里写了一个 Minecraft 1.13.2 查找种子的程序，[MinecraftSeedReverse](https://github.com/YanWQ-monad/MinecraftSeedReverse)（查找高 16 位调用了 cubiomes）。

虽然说 1.14 跟 1.15 的也有，但是我改用了 Rust 编写（筛选低 48 位的部分），但是查找高 16 位还要另外写程序用 C++ 跑 cubiomes，有点不美观，就一直没有放上来。

如果要一站式的开箱即用的工具，有位外国小哥开发了一个 mod，叫做 [SeedCracker](https://github.com/KaptainWutax/SeedCracker)，可以自动搜集信息自动破解，而且搜集的信息比我上面写的还多（虽然它没有用生物群系）。比我手动的智能多了。

# 参考

[^1]: [Cubitect. *Summary of the Biome Generation in Minecraft 1.7 - 1.12*](https://github.com/Cubitect/cubiomes/blob/master/LayerSummary.pdf)
[^2]: [Source of `java.util.Random`](https://hg.openjdk.java.net/jdk8/jdk8/jdk/file/tip/src/share/classes/java/util/Random.java#l146)
[^3]: [地图种子逆向工程技巧：分区暴力搜索](https://www.mcbbs.net/thread-816891-1-1.html)
[^4]: [USTC Hackergame 2020 超迷你的挖矿模拟器 题解](https://github.com/USTC-Hackergame/hackergame2020-writeups/blob/master/official/超迷你的挖矿模拟器/README.md)
