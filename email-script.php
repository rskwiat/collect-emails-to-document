<?php
	if (isset(
		$_POST['email'] )) {
			$errors = array();
			$email = $_POST['email'];
			//Check Emails if valid
			if (empty($email)) {
				$errors[] = print "<script> alert('E-Mail Field is Required') </script>";
 			} else {	
				if (filter_var($email, FILTER_VALIDATE_EMAIL) === FALSE) {
					$errors[] = print "<script> alert('Not a valid E-Mail Address') </script>";
				}
			}
		//Display Errors
		if (!empty($errors)) {
			//loop through errors
			foreach ($errors as $error) {
				//If Errors goto error page
				print "<meta http-equiv=\"refresh\" content=\"0;URL=error-page.php\">";
				}
			} else {
				
		//Write Emails to text document
		if(!isset($error)) {
			$fp = fopen("emails.txt", "a");
			$savestring = $email . ",\n";
			fwrite($fp, $savestring);
			fclose($fp);
			} // End Email		
				print "<meta http-equiv=\"refresh\" content=\"0;URL=index.php\">";
			}
		}
?>