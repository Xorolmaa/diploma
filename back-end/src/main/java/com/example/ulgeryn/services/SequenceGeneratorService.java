package com.example.ulgeryn.services;

import com.example.ulgeryn.models.DBSequence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import org.springframework.stereotype.Service;



import java.util.Objects;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;


@Service
public class SequenceGeneratorService {
    @Autowired
    private MongoOperations mongoOperations;
    public int getSequenceNumber(String sequenceName) {
        //get sequenceNo
        Query query = new Query(Criteria.where("id").is(sequenceName));
        //update sequence
        Update update = new Update().inc("seq", 1);
        //modify in document
        DBSequence counter = mongoOperations
                .findAndModify(query,
                        update, options().returnNew(true).upsert(true),
                        DBSequence.class);
        return !Objects.isNull(counter) ? counter.getSeq() : 1;
    }
}
