package com.example.ulgeryn.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "content")
public class Content {
    @Id
    private String id;
    private String title;
    private String imageUrl;
    private Integer likeNumber;
   // private String userId;
    @DBRef
    private User author;
    @DBRef
    private Category category;
    @DBRef
    private List<Version> versions;
}
