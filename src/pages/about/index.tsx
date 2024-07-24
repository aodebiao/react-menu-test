import React, {memo, useEffect, useState} from "react";
import Markdown  from "react-markdown"
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark,funky} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import rehypeHighlight from "rehype-highlight"
import remarkMath from "remark-math";


const About:React.FC = (url) => {

    const [sourceMd, setSourceMd] = useState("");

    useEffect(() => {
        // 请求文件 (请求的是项目public目录下的文件)
        fetch("/md/README.md")
            .then((res) => res.text())
            .then((text) => setSourceMd(text));
    }, []);

    return <div>
        <Markdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeHighlight,rehypeRaw ]}
            children={sourceMd}
            components={{
                code(props) {
                    const {children, className, node, ...rest} = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                        <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                            style={docco}
                        />
                    ) : (
                        <code {...rest} className={className}>
                            {children}
                        </code>
                    )
                }
            }}
        />
    </div>
}

export default memo(About)