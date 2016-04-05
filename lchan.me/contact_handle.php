<?php
    if ( $_SERVER["REQUEST_METHOD"] == "POST") {
            $data = json_decode(file_get_contents("php://input"));
            $name = $data->name;
            $email = $data->email;
            $message = $data->msg;

            if ( !empty($name) && !empty($email) && !empty($message)) {
                $to      = 'ken@leungchan.net';
                $subject = 'Peronsal website - messages from '.$name;
                $msg =  $message;
                $headers = 'From: '.$email. "\r\n" ;

                if (mail($to, $subject, $message, $headers) ) {
                    echo json_encode(array("msg" => "Thank you for contacting me. I'll reply you asap!"));
                } else {

                    echo json_encode(array("msg" => "Some problem with the email system."));
                }

           } else {
                echo json_encode(array("msg" => "Required fields were not filled."));
           }
    }


?>
