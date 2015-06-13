/*
 Write a function for extracting all email addresses from given text.
 All sub-strings that match the format @… should be recognized as emails.
 Return the emails as array of strings.
 */

(function extractEmails() {
    var text = "just@some.tests+++to-prove@that.this()program@works.fine",
        mails = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);

    console.log(mails);
})();