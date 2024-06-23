package com.javatpoint.service;

import com.javatpoint.DTO.AdDTO;
import com.javatpoint.DTO.CommentDTO;
import com.javatpoint.model.Ad;
import com.javatpoint.model.Comment;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-01-30T23:09:27+0200",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 1.8.0_382 (Temurin)"
)
@Component
public class MapStructMapperImpl implements MapStructMapper {

    @Override
    public List<AdDTO> adsToDto(List<Ad> ads) {
        if ( ads == null ) {
            return null;
        }

        List<AdDTO> list = new ArrayList<AdDTO>( ads.size() );
        for ( Ad ad : ads ) {
            try {
                list.add( adToDto( ad ) );
            }
            catch ( IOException e ) {
                throw new RuntimeException( e );
            }
        }

        return list;
    }

    @Override
    public List<CommentDTO> commentsToDto(List<Comment> comments) {
        if ( comments == null ) {
            return null;
        }

        List<CommentDTO> list = new ArrayList<CommentDTO>( comments.size() );
        for ( Comment comment : comments ) {
            list.add( commentsToDto( comment ) );
        }

        return list;
    }

    @Override
    public CommentDTO commentsToDto(Comment comments) {
        if ( comments == null ) {
            return null;
        }

        CommentDTO commentDTO = new CommentDTO();

        commentDTO.setId( comments.getId() );
        commentDTO.setDate( comments.getDate() );
        commentDTO.setContent( comments.getContent() );
        commentDTO.setScore( comments.getScore() );
        try {
            commentDTO.setUser( userToDto( comments.getUser() ) );
        }
        catch ( IOException e ) {
            throw new RuntimeException( e );
        }
        commentDTO.setAdId( comments.getAdId() );

        return commentDTO;
    }
}
