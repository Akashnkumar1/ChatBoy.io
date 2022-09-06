package com.chatboy.chatboy.controllers;

import com.chatboy.chatboy.models.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @MessageMapping("/message") // to send messages
    @SendTo("/topic/return-to") // to Receive messages
    public Message getContent(@RequestBody Message message){
        try{
            //to Store Data to DB.
            Thread.sleep(200);
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        return message;
    }
}
