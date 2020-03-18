# GUI Easy

This is the front end of the [ESP Easy](https://github.com/letscontrolit/ESPEasy) firmware.
As of version 2.1.0 of the firmware GUI Easy is the frontend that you will download in order
to get a graphical user interface, by default the units are only accessed using a JSON based
API. We are completely independent code wise which makes it ideal to use even if no
internet is available, all you need to have is within the gzipped file.

## Getting Started

If you want to manually download and install the front end you should head over to the
[build](/build) directory and find a release you want to use. The builds marked with
**nightly** and **rcN** are not to be used in production, only as tests. Inside the
[build](/build)/**version** folder you will find the following files:

* gui.min.css
* src-``<version>``.zip
* main/index.htm.gz &larr; **This is what you're looking for**
* mini/index.htm.gz
* noDash/index.htm.gz

Of these files the actual GUI Easy "engine" is compiled into the main/**index.htm.gz** file.
The minified css, js, and html files are the backbone of this gz:ed file. The src-``<version>``.zip
is the source code of the project as it was at the time of compile. In the directory **mini**
you will find the minimal interface used as default fallback GUI. For a slimmer "full" version
you may use the **noDash** version.

### Compile Yourself

If you plan on contributing to the project you need to be able to compile stuff yourself in
order to bug test as close as release conditions as possible. What you need to do:

1. Install [Node.js](https://nodejs.org/en/download/), this will include [npm](https://www.npmjs.com/get-npm)
which is what we use to compile the project. 
2. Install [Grunt.js](https://gruntjs.com/) + dependencies ([package.json](/package.json), run ``npm install``
from the project root level)
3. Install Grunt Command Line Interface using your terminal/cmd, and thanks to npm it's this easy:

```
npm install -g grunt-cli
```

The compile is then done using your terminal/cmd, make sure you're in the same
directory as the **Gruntfile.js** (this is the root of the project). Run the compile script
using this command:

```
grunt
```

The script will output something like this (but much more text):

```
Running "buildGuiEasy" task
>> 0.0.nightly.1

Running "clean:temp" (clean) task
>> 1 path cleaned.

Running "clean:version" (clean) task
>> 0 paths cleaned.

Running "uglify:main_thread" (uglify) task
>> 1 file created 227.5 kB → 136.67 kB

Running "cssmin:target" (cssmin) task
>> 1 file created. 100.84 kB → 86.81 kB

Running "processhtml:main" (processhtml) task

Running "compress:source" (compress) task
>> Compressed 1 file

Running "compress:main" (compress) task
>> Compressed 1 file

Running "compress:mini" (compress) task
>> Compressed 1 file

Running "rename:temp" (rename) task
Renaming Directory build/temp -> build/0.0.nightly.1

Done.
```

Congrats, you just compiled your build from source!

### Test compile

If you want to just make a dirty compile you can use the command ``grunt test``. This
command will make a compile of your current code base. The compile script will put the
test build in the ``/build/0.0.0.0.0`` folder and also add a timestamp to the "version".
If you do a new ```grunt test``` the ``/build/0.0.0.0.0`` folder will be wiped clean!  

### Run as localhost

In the folder ``src`` you find (currently) two html files. The ``index.html`` is the main
file we use when developing. ``index-minimal.html`` is the frontend for units that do not
have the full frontend installed. If you develop you might want to connect to an existing unit
in your local network. Point to this unit inside a file called ``custom.json``, see the
 ``custom-template.json`` for reference on the syntax. If this file doesn't exist when you
 try the frontend from your local machine you will get an error in the browser console and
 the frontend will not load. 

### Source Code Ideology

As you will find out the source code is composed by several individual JavaScript files.
You need to understand that source code and release build code are two vastly different
types of code. The source code base needs to be easy to overlook and "full of comments",
whereas the release build should be as small as possible. This is why we use Grunt to
compile the source into build code.

We use a SPA (single page application) approach for our GUI. The idea of a SPA is that
the browser will never need to jump to new pages, they are all loaded from the root of
the web server. The data from the unit, which is constantly updating, is the only thing
that is needed to be fetch - not the html elements. This way we save a lot of computing
operations of the tiny micro processor which the web server is run by.

#### Targeted Web Browsers

We cannot allow us to have backwards compatibility with old web technology (as in IE11
and earlier), newer browsers are always up to date which makes it easier to create a stable
GUI.

#### index.html

The **index.html** is the skeleton of the entire project. We will put all our dynamic
html elements into this skeleton, thus creating the complete interface. Lets break the
file down, leaving out the generic html syntax and only focusing on what makes this
project a bit different compared to other projects.

```
<head>
    <!-- build:css inline build/temp/gui.min.css -->
    <link rel="stylesheet" href="src/gui_easy.css">
    <!-- /build -->
    <!-- build:js inline build/temp/gui.min.js -->
    <script src="src/gui_easy_settings.js"></script>
...
    <script src="src/gui_easy_ini.js"></script>
    <!-- /build -->
</head>
```

The comments ``<!-- build:css ... -->`` and ``<!-- build:js ... -->`` ending with
``<!-- /build -->`` are very important for the compile script. These lines tell
the script that the files in-between the opening and closing comments should be
made into one, minified, file and copied to the temp folder. If new ``.js`` files are
created they need to be added to the ``Gruntfile.js`` file as well!

After the head we have the body, this is where we put all the visible elements. To
make the build up of the interface as easy as possible we have created a simple markdown
syntax based on opening and closing curly brackets `{{..}}`. There's three major ``div``
elements which you should be aware of:

##### view-got-box-shadows [class]

This ``div`` is only used to give the page a shadow in the top and bottom of the view,
the idea is to get a feeling that the page scrolls beneath the border. 

##### modal-container [id]

This ``div`` is used to throw modal messages, menus, and the boot screen. Since we want
something to be displayed on the screen until the entire page is ready to be displayed
we need to put static html here. This is where the loading animation comes in.

###### fallback-loading-animation [id]

If the boot sequence isn't successful we still want to see something on the screen.
So we put **five dots (of horror)** that pulses, this would be the equivalent of Windows' ``blue screen
of death`` or Amiga's ``guru meditation``. In other words, not good. But still a necessity.

###### modal-loading-screen [id] & boot sequence

Here we put the boot sequence information, the boot (and post boot) are made up of the
following hocus pocus: 

* Helper
* Curly
* Scrubber
* Popper
* Pitcher
* Butler
* Snitch
* Tender

They are initiated in the order above which can be described as this:

                Curly           <--- Boot started (+ Helper initiated)
                  |                  Curly is converting {{..}} into HTML
               Scrubber              Scrubber is touching up the HTML
                  |                  Popper creates eventhandlers
                Popper               Pitcher waits for everthing to get ready,
                  |                  then starts to apply settings/theme
               Pitcher          <--- Boot ended
             /    |    \        <--- GUI is ready
       Tender   Butler  Snitch  <--- First human interaction possible
        LOOP     GET     POST   <--- The type of flow of the function
                                     Tender continuously updates data and visual stuff
                                     Butler gets data from the internet (1 time)
                                     Snitch posts data to our server (1 time)

These guys are what's making the SPA run smoothly. They can be divided into four groups:

* All around (Helper)
* Builders (Curly, Scrubber, Popper, Pitcher)
* Sprinters (Butler, Snitch)
* Runner (Tender)

We like to think of this bunch as the [Snap, Crackle and Pop](https://en.wikipedia.org/wiki/Snap,_Crackle_and_Pop)
mascots of the cereal Rice Krispies. Fun, hardworking, dudes that makes our day a bit
brighter by their simple existence.

The _all around_ ``Helper`` is used by all the other guys, it doesn't initiate anything
on its own. It only acts on other's request.

_Builders_ are the ones working during the boot. ``Curly`` turn all the ``{{..}}`` into static
html code, some curlies got curlies inside them, so Curly will run as many times as needed
to get all the code converted. ``Scrubber`` got a pretty easy job, it makes some of the
static html code ready for the next guy in line by adding classes and tweaking some elements
etc. ``Popper``, on the other hand, is constantly aware by creating events and functions
that will create html on-the-fly when these events are fired. Right after that ``Pitcher``
enters the scene and start fetching data from the unit, this guy's only a one time
sprinter and will create the data object and populate the html page with initial values.

_Sprinters_ will get and push data from and to the internet. ``Butler`` get (crude)
location of the client's IP address together with language etc. ``Snitch`` is the guy telling our server
that a new unit has been installed, together with the closest city name, only used for our
internal statistics. We respect the individuals integrity and only use this to know the
fragmentation of the installations. This way we get a better understanding if we need to have full
backwards compatibility etc. etc.

Finally we have the _runner_, currently only one is existing, ``Tender``. The idea behind
these guys is that they will continuously get data to and from the unit(s).

###### {{NAVBAR}} [curly]

The top navbar which contains the tabs. We have two "right" navbar elements, one for full
view and one for mobile view. The "right" navbar will be on the second row if the screen
isn't big enough to have the "left" and "right" side-by-side.

###### {{WAVE}} [curly]

The wave is one of our elements we can use to notify our users about stuff, it's mainly used
to display single words together with a color. As an example, if the user click "save" the wave
element will cover the entire view with the text "save" in the "middle" and the color will
be set to "success" (green), more on colors later. The message will only last for a second or
so and then go away.

##### page-container [id]

Inside this container we have multiple sub-containers with the class _container_, these
containers corresponds to a tab with the exact same name. This will make the Popper display
the correct container if a tab is clicked.

##### {{NOTIFIER-TOP}} [curly]

The top notifier is used to notify the user about states and errors. It can display short
sentences together with a color. The user can click to close this notifier and you can
also have it automatically close by setting a countdown timer.

##### {{MENU-ACTION}} [curly]

Sticky action button in lower right corner. It floats over all elements but never goes out of
view. This menu will only host shortcuts to modal menus and settings save, cancel etc.

##### {{DRAWER-THEME}} [curly] **Patreon feature!**

A drawer is a menu that resides at the bottom and is accessed by clicking on the tab. The
theme drawer hosts all the settings related to the look and feel of the interface.

##### footer [class]

This is where we have the information that always is displayed. The logo together with sponsors
are placed here.

#### CSS Variables

```
--scale-size:               16;
--row-size:                 20;
--overflow-tab-text-size:   24;
--max-width-page-size:	    1400px;
--state-of-navbar-toggle:   fixed;
--button-radius-size:	    1;
--button-icon-size:         0;
--main-bg-color:	    52,146,226;
--main-inverted-color:	    47,66,82;
--main-sunny-color:         255,209,0;
--main-info-color:          255,143,18;
--main-warning-color:       239,72,61;
--main-success-color:       0,174,65;
--main-font-color:	    255,255,255;
--default-font-family:	    "Segoe UI",Calibri,Arial;
```

### dataset [syntax]

By setting different datasets for click etc. the Popper will automatically create events
for these elements. Please refer to the source code on all different ways of doing this.

### TODO: [syntax]

By commenting using the `TODO:` syntax it's easier to find where to start digging.

### Editor

Any text editor will do but officially we use [WebStorm](https://www.jetbrains.com/webstorm/) by JetBrains.

## Version Schema

We use the following version schema (and is set in the [gui_easy_settings.js](/src/gui_easy_settings.js) file):

``X.Y.Z``

X = major version number: a big jump in features or refactoring of code. This is always
set manually when an official new release is deployed.

Y = minor version number: any new features or updates will render at least a minor bump.
This is always set manually when an official new release is deployed.

Z = revision version number: any change in source code will be followed by a bump in
the revision version number. This is always set automatically each night by our robot.
Official releases will always reset this number back to zero and at only very rare
occasions (critical bug fix etc.) be part of a official release version.

Apart from these three levels we also have the ``nightly`` and ``rc<N>`` tags. These
are set if the release is made by the robot. The tag is injected into the version name
between the ``Y`` and ``Z``. 

The full version name exemplified:

``0.0.nighlty.1``

``1.2.rc1.112``

``2.3.0``

A release cycle exemplified:

``1.0.0``  <--- release

``1.0.nightly.1``  <--- working on a fix or a new major/minor release

...

``1.0.nightly.123``  <--- we decide that this one will be next 1.1.0

``1.0.rc1.124``  <--- here's the release candidate (1.0.nightly.123 code base)

``1.0.rc2.125``  <--- we found some stuff we wanted to change in the rc1

``1.1.0``  <--- we release 1.0.rc2.125 as 1.1.0

When the Gruntfile.js file is executed it will look into the source and parse the version
data. This is made possible by the opening ``//--GRUNT-START--`` and closing ``//--GRUNT-END--``
tags. Please observe that the ``,`` after the closing tag need to be on the line below
the tag for the script to function correctly.

### Grunt "bump" Command

To bump revision we have created a Grunt command called ``grunt bump``. You can do the following
to update the ``src/gui_easy_settings.js`` file:

```
grunt bump:revision
>> 0.0.nightly.2 --> 0.0.nightly.3
>> 0.0.4 --> 0.0.nightly.5

grunt bump:minor
>> 0.0.nightly.2 --> 0.1.0

grunt bump:major
>> 0.0.nightly.2 --> 1.0.0

grunt bump:rc
>> 0.0.nightly.2 --> 0.0.rc1.3

grunt bump:dev=true
>> 0.0.2 --> 0.0.nightly.2

grunt bump:dev=false
>> 0.0.nightly.2 --> 0.0.2
>> 0.0.rc1.3 --> 0.0.3     <--- this one isn't correct

grunt bump                 <--- will return current version
>> 0.0.nightly.2
```

As seen in the second to last example, if you have a release candidate number assigned when you set
the development flag to true it will still have that rc number. That being said, you should only
use the dev=BOOL to quickly set the version handler to development mode if you by some chance 
made a mistake when you bumped. The workflow is like this.

You're doing some development and want to bump the version. By simply using the ``grunt bump:revision``
the flag will automatically set the development flag to true. If this isn't desired (you want to push
the current revision number as a production ready version) you can then use the ``grunt bump:dev=false``.
Normally this isn't wanted, only major and minor releases are the ones that are released as production
ready.

Release candidates are by definition never set to the future major and/or minor level. See this example:

```
[grunt bump:major]     1.0.0           is already released and we want to create a new version with extra stuff
[grunt bump:revision]  1.0.nightly.1   is created and we start adding the stuff
...
[grunt bump:revision]  1.0.nightly.123 is ready to be tested by a broader user base
[grunt bump:rc]        1.0.rc1.124     is created
...
[grunt bump:rc]        1.0.rc3.126     is the version that is finally accepted
[grunt bump:minor]     1.1.0           is created and released
```

Another example

```
[grunt bump:minor]     1.1.0           is already released but we found a bug that cannot wait for next
                                       version to be resolved
[grunt bump:revision]  1.1.nightly.1   is created and we start fixing the bug
...
[grunt bump:revision]  1.1.nightly.5   is ready to be tested by a broader user base
[grunt bump:rc]        1.1.rc1.6       is created and after testing accepted
[grunt bump:revision]  1.1.nightly.7   (since this is the one we want to release as the patched version,
                                       so we need to remove the dev. flag)
[grunt bump:dev=false] 1.1.7           is created and released
```

As you can see, ``nightly`` and ``rc`` is **only a state** of the code, the revision is still
the actual version together with the major and minor number. You may be used to the term
metadata or tag, anyway, they are not used as actual versions.

## CSS Framework

The entire CSS framework can be used for any other web site or project but currently we haven't
created a demo site with code examples. This might change in the future if other uses of
this framework is gaining interest. The same goes for JavaScript components which are currently
very ESP Easy specific.

## Queen Bee & Drones

By default a unit that have the ``index.htm.gz`` file on-board will act as the "Queen Bee".
The Queen is hosting the web interface and all other units that is stored in the Queen's node
list will be referred to as "Drones", units that will only be reached using API. A Queen
and the following Drones form a "Swarm" of units. This means that by simply browsing to
a Queen you can jump to all the Drones in that Swarm without the need of loading the html
code more than once. This makes surfing the Swarm a breeze, for you and the units.

## Dash

We use something we call ``dash``'s to create small widgets which can be either populated
with data or used for human interaction (buttons, sliders etc.). They can use ``curly`` or
``html`` syntax and reside in a square element on the custom dashboard.

## Forms

The ``controllers``, ``plugins``, and ``notification`` setup pages are defined by their
corresponding page. These can, similar to dash's, use either html or curly syntax.

## CORS error when running as localhost

You need to have CORS allow cross-domain allowed for the GUI to work running from your localhost
server. We use [this](https://mybrowseraddon.com/access-control-allow-origin.html) add-on which
lets you turn it on/off by the click of a button.

## Sponsorship

We are happy for any means of funding you may want to send our way. Please use one of these
channels:

* [Ko-Fi](https://ko-fi.com/GrovkillenTDer): one time (public)
* [PayPal](https://www.paypal.me/espeasy): one time (anonymous)
* [Patreon](https://www.patreon.com/GrovkillenTDer): reoccurring (monthly, extra features, public)

## Authors

* **Jimmy "Grovkillen" Westberg** - *Initial work* -
[Github](https://github.com/Grovkillen),
[Dribbble](https://grovkillen.dribbble.com)

Full list of [contributors](https://github.com/letscontrolit/GUIEasy/contributors)
who participated in this project.

## License

Please refer to [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

* All icons are sponsored by [ICONS8](https://icons8.com/)
* Location lookup using [ipapi.co](https://ipapi.co/)
* Weather information API using [weatherstack](https://weatherstack.com/)
* Screenshots using [html2canvas](https://html2canvas.hertzen.com/)
* Inspiration for the terminal look of the Drones come from ``Terminal.css`` found [here](https://terminalcss.xyz/)

## Sponsors

The following awesome fans are sponsoring us via Patreon, at gold level or more, each month.

### Company Level

### BOM Level

💎 Friedrich Bader

### 2x Platinum

👑 CARL E FORSTER

### Platinum

🏆 Bert van den Bergh,
🏆 Dennis van der Weck,
🏆 Droscovi,
🏆 Harald Fauland,
🏆 Mikael Brusman

### Gold

🥇 Alain,
🥇 Alex Bik,
🥇 Andrew Piechocki,
🥇 Anupam Singh,
🥇 Armin Krämer,
🥇 Clinton Lee Taylor,
🥇 Etienne Bottke,
🥇 Hightower,
🥇 IoTPlay,
🥇 Jan Kazimour,
🥇 KJ Dijkema,
🥇 Marcus Lindberg,
🥇 Markus Kuntz,
🥇 marzog,
🥇 Michael Buchholz,
🥇 Olaf,
🥇 Reinhold Kainhofer,
🥇 Rich Schiffli,
🥇 Stefan Boschert

### ❤ Thank you notes ❤

Thank you from the bottom of our hearts, without your support we wouldn't be able to do this.