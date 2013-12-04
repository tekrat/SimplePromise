/*

** Simple Promise **
A micro class to create simple promises

*Disclaimer*
This code is provided without warranty. While I strive to maintain backwards 
compatibility with previous versions, the code is still under active development. 
As this is the case, some revisions may break compatibility with earlier 
versions of the library. Please keep this in mind when using eTable.

*Copyright and Licensing*
Copyright (c) 2013 Ervin Kosch, released under the GPL 3 license

*Updated Source Code and Instructions:*
	https://github.com/tekrat/SimplePromise

*/
function SimplePromise() {
    
    // Error value
    this.error = {};
    
    // Common data object
    this.data = {};
    
    // A full stop object to handle bad conintues
    this.fullstop = {
        "next":function(){
        
        }
    }
	
	// Should execution stop? Stop function
	this.stopexe = false;
	this.stopfn = false;
	
	// Trigger to stop promis queue
	this.stop = function(fn){
	
		// Set the execute value
		this.stopexe = true;
		
		// Set the special stop function
		if(typeof fn != "undefined"){
			this.stopfn = fn;
		}else{
		
			// None found reset the stop function
			this.stopfn = false;
		}	
	}
    
    // Default error handler
    this.errorfn = function (err) {        
        alert(err);
    };
	
    // Execute function and process next function
    this.next = function (fn, fe) {
        
        this.error = {};
        
        try {
            // Try to run function and launch next
			if( this.stopexe == true ){
			
				// Reset if the object is re-used
				this.stopexe = false;
				
				// If the special stop function exists, execute it
				if(this.stopfn != false){
					this.stopfn();
				}
				return;
				
			}else{
			
				// Execute the next function
			    fn(this.data);
			}
            return this;
        } catch (err) {
		
            // Save error in persistant object
            this.error = err;            
			
            // Error found, run through error function
            var goOn = false;
            if (typeof fe == "undefined"){
                goOn = this.errorfn(err);
            }else{
                goOn = fe(err);
            }
                     
            if(goOn == true)
                return this;
            else
                return this.fullstop
        }
    }
    
    this.AJAX = function(url, data, requesttype){
    
			// Initialize the xml element
			var xmlhttp;
			if (window.XMLHttpRequest)
			{// Code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			}
			else
			{// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			
			// Generate data set
			var dataSet = "";
			for(var k in data){
				dataSet += k + "=" + encodeURIComponent(data[k]) + "&";
			}
			// remove trailing amphersan
			if(dataSet != "")
				dataSet = dataSet.substring(0, dataSet.length - 1);
			
			if(typeof requesttype == "undefined" || requesttype.toUpperCase() == "GET"){
				xmlhttp.open(
					"GET",
					url + (dataSet == "" ? "?" + dataSet : ""),
					false
				);
				xmlhttp.send();
			}else{
				xmlhttp.open(requesttype.toUpperCase(), url, false);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send(dataSet);			
			}
			
			if(xmlhttp.status == 200){
				return xmlhttp.responseText;
			}else{
				var errorID = xmlhttp.status + " - Code Unknown";
				if( xmlhttp.status == 403 )
					errorID = "403 - Restrcited/Forbidden Resource";
				if( xmlhttp.status == 404 )
					errorID = "404 - Resource not found";
				if( xmlhttp.status == 408 )
					errorID = "408 - Connection timed out";
				if( xmlhttp.status == 414 )
					errorID = "414 - URL Too Long:";
				if( xmlhttp.status == 500 )
					errorID = "500 - Server Error or Resource Busy";
			
				throw errorID;
			}
			
    }
    
}