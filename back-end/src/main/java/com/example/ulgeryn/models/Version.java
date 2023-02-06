package com.example.ulgeryn.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "version")
public class Version {
    @Transient
    public static final String SEQUENCE_NAME = "version_sequence";

    @Id
    private Integer id;
    private String versionName;
    private String text;

    private String audioUrl;
//    private Photo photo;
    private Date publishDate;
    private Boolean isDefault;

}
