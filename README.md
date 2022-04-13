# CSCI2356-Project

# Installation

The software can be installed and setup as follows:

```
git clone https://github.com/Colby-O/CSCI2356-Project
```

```
cd project-folder/server
```

```
npm install
```

```
npm start
```

The software is now ready to be used. <br>
NOTE: npm start is setup to run the server as a background process that automatically restart upon a crash. To run a single instance of the server the following command can be ran:

```
npm test
```

# TODO

## Interface Software Requirements:

~[I-01] P2 shall operate in the Chrome browser.~ <br>
~[I-02] P2 shall communicate with the server using the http protocol.~ <br>
~[I-03] P2 shall include Node.js server software.~ <br>
~[I-04] P2 shall not include any database software.~ <br>

## Client-Side Software Requirements:

~[C-01] One square key on the keyboard shall be 50px by 50px.~ <br>
~[C-02] The space around each key (above, below, left, and right) shall be 25px.~ <br>
~[C-03] The font size for all text, including on the keys, is 2 times the default font size.~ <br>
~[C-04] The keyboard width must not go beyond 725px.~ <br>
~[C-05] A full keyboard shall be implemented meaning !@#$%^&\*()-\_=+;:'"<>,.? and all the digits and all the uppercase and lowercase letters will be included.~ <br>
~[C-06] Each key will expand to 2 times its dimensions when hovered.~ <br>
~[C-07] The keyboard shall initially display lowercase keys.~ <br>
~[C-08] A space will automatically be inserted after a word in the wordbank.~ <br>
~[C-09] A shift key shall be present.~ <br>
~[C-10] When the shift key is pressed, the whole keyboard will change to uppercase letters.~ <br>
~[C-11] Numeric and symbol keys may be organized so they are useable in one of the two uppercase or lowercase modes.~ <br>
~[C-12] Once a key is clicked, the effect of the shift key is terminated.~ <br>
~[C-13] A caps-lock toggle key shall be present.~ <br>
~[C-14] The keyboard shall contain a word bank area.~ <br>
~[C-15] The client shall be able to enter a word or phrase into the word bank by typing it out.~ <br>
~[C-16] Every word or phrase in the word bank is visible to the user at the same time.~ <br>
~[C-17] The colour scheme shall have a Montreal Canadians theme.~ <br>
~[C-18] P1 shall be modified so that each blog has a noneditable number rather than a name.~ <br>
~[C-19] P1 shall be modified so that when an edit toggle is clicked, all the Blog Number, Edit, and Publish columns disappear.~ <br>
~[C-20] When an edit toggle is clicked, the text entry area and keyboard shall appear.~ <br>
~[C-21] The text entry area shall be 8 lines tall.~ <br>
~[C-22] The text entry area shall be above the keyboard.~ <br>
~[C-23] The text entry area shall have a save button.~ <br>
~[C-24] The text entry area shall have a cancel button.~ <br>
~[C-25] The text entry area shall have a one-time undo button.~ <br>
~[C-26] When the save button [C-23] is clicked a first warning shall enable the user to cancel or continue.~ <br>
~[C-27] When the first warning's continue option [C-26] is selected, a second warning shall enable the user to cancel or continue.~ <br>
~[C-28] When the cancel button [C-24] is clicked a first warning shall enable the user to cancel or continue.~ <br>
~[C-29] When the first warning's continue option [C-28] is selected, a second warning shall enable the user to cancel or continue.~ <br>

## Server-Side Software Requirements:

~[S-01] The server shall maintain storage for each blog corresponding to [C-23].~ <br>
~[S-02] The server shall maintain storage for the status of each publish toggle.~ <br>
~[S-03] The blogs and publish buttons status shall be lost when the server program stops.~ <br>

## Particular Additions:

~[P-01] Add indicator for what blog we are editing, since the blogs, edits, and publish are supposed to disappear.~ <br>
~[P-02] Add blinking line to tell you what line you are currently editing (currently disappears after you start typing).~ <br>
~[P-03] Allow editing of previous words. Currently when you select where you want to edit, it adds that change to the last word or space you typed, instead of where you wanted to edit.~ <br>
[P-04] Caps should only deal with capital letters, NOT special characters. <br>
~[P-05] Tab key is missing.~ <br>
[P-06] All keys should expand,including shift, CAPS, Tab, save, cancel, etc. <br>
[P-07] Check if CAPS remains highlighted when in use. <br>
[P-08] Place holder text may be useful, for example in the wordbank when it is empty. <br>
[P-09] Character limit on the words in the wordbank. <br>
[P-10] Ensure there are NO SCROLL BARS! <br>
[P-11] To prevent scrolling with the wordbank, consider making a limit for the words on one page of the wordbank, when full it adds to the next page. <br>
[P-12] Consider making a separate tab (like on chrome) dedicated to switching between the wordbank and the keyboard. (Check with instructor if this idea is valid) <br>
[P-13] Ensure there is a delete mode for the deleting words in the wordbank (maybe add a trash icon on the button). <br>
[P-14] Ensure the word bank expands downward, not sideways (if the wordbank exists on the right side of the keyboard). <br>
~[P-15] Make sure that ONLY the shift or CAPS keys can be active at one time, and that selecting the other when one is active, does nothing.~ <br>
[P-16] Fixed Adding/Deleting From Word Bank i.e. need to find smallest available word_id. <br>
[P-17] Fixed word bank updating client side. <br>
