SimplePromise
======

Create a basic promise system for processing

Example Usage:
======

  **
  var objPromise = new SimplePromise();<br />
  //Reset the default <br />
  objPromise.errorfn = fucntion(err){<br />
	console.log(err);<br />
	// make sure everything stops processing<br />
	objPromise.stopexe = true;<br />
  }<br />
  <br />
  objPromise.data = {<br />
	"CommonData":"availible to all steps"<br />
  }<br />
  <br />
  // Start promise set<br />
  objPromise<br />
	// do a function<br />
	.next(<br />
		function(data){...do something}, <br />
		function(errData){...decide if this promise should stop  }<br />
	)<br />
	// do another function<br />
	.next(<br />
		function(data){...do something}, <br />
		// No error function, use default error process<br />
	)<br />

Disclaimer
=====
This code is provided without warranty. While I strive to maintain backwards compatibility with previous versions, 
the code is still under active development. As this is the case, some revisions may break compatibility with earlier 
versions of the library. Please keep this in mind when using SimplePromise.

Copyright and Licensing
======
Copyright (c) 2013 Ervin Kosch, released under the GPL 3 license