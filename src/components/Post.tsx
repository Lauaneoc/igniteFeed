import { format, formatDistanceToNow } from 'date-fns'
import {ptBR} from 'date-fns/locale'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import styles from './Post.module.css'

import { Comment }  from './Comment'
import { Avatar } from './Avatar'

interface Author {
    name: string
    avatarUrl: string
    rule: string
}

interface Content {
    type: "paragraph" | "link"
    content: string
}

export interface PostType {
    id: number
    author: Author
    publishedAt: Date
    content: Content[]
}

interface PostProps {
    post: PostType
}

export function  Post({post}:PostProps) {
    const [comments, setComments] = useState([
        'Post muito bacana, hein?!'
    ])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted =  format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt,  {
        locale: ptBR,
        addSuffix: true
    })

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()

        setComments([...comments, newCommentText])
        setNewCommentText('')
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("")
        setNewCommentText(event.target.value)
    }

    function deleteComment(comment: string) {
        setComments(comments.filter(com => com != comment))
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("Esse campo é obrigatório")
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl} />
                    <div className={styles.athorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.rule}</span>
                    </div>
                </div>

                <time 
                title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            {/* Conteudo */}
            <div className={styles.content}>
                {post.content.map(cont => {
                    if(cont.type == 'paragraph') {
                        return (
                            <p key={cont.content}>{cont.content}</p>
                        )
                    } else if(cont.type == 'link') {
                        return (
                            <p key={cont.content}><a>{cont.content}</a></p>
                        )
                    }
                })}
            </div>

            {/* Formulario de comentario */}
            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    onChange={handleNewCommentChange} 
                    name="comment" 
                    value={newCommentText}
                    placeholder='Deixe um comentário'
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                <footer>
                    <button type='submit' disabled={newCommentText.length === 0} >Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(content => {
                    return <Comment key={content} content={content} onDeleteComment={deleteComment} />
                })}
            </div>
        </article>
    )
}