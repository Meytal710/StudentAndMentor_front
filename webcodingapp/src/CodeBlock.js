import React, { useState, useRef, useEffect, useLayoutEffect   } from 'react';
import { io } from 'socket.io-client';
import './CodeBlock.css';
import hljs from "highlight.js";
import 'highlight.js/styles/default.css';
import javascript from "highlight.js/lib/languages/javascript";
import { Link } from 'react-router-dom';
import CodeEditor from '@uiw/react-textarea-code-editor';

hljs.registerLanguage("javascript", javascript);

const socket = io("https://studentandmentorback-production.up.railway.app/");

function CodeBlock({codes}) {

    const href = window.location.pathname;
    const currId = Number(href.slice(-1));
    const currCode = codes.find(c => c.id === currId);
    const ref = useRef(null);
    const [code, setCode] = useState(currCode.code);
    const [isMentor, setIsMentor] = useState(false);

    useEffect(() => {
        socket.on('changedCode', code => {
          setCode(code);
       });
      
    }, []);

    useLayoutEffect(() => {
        socket.on('getStatus', status => {
          setIsMentor(status);
       });
      
    }, []);

    useEffect(() => {
      hljs.highlightBlock(ref.current);
    }, [ref]);


    const onSaveChanges = () => {
        const newCode = ref.current.value;
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                 code: newCode })
        };
        fetch(`https://studentandmentorback-production.up.railway.app/code/${currId}/saveChanges`, requestOptions);
        setCode(newCode);

    };

    const onChangehandle = (event) => {
        const newcode=event.target.value;
        setCode(newcode);
        socket.emit("newCodeChange",newcode);
      };


    return (
    <div className='CodeBlockContainer'>
      <h2 className='CodeBlockTitle'>{codes[currId-1].title}</h2>
      <hr />
        <CodeEditor
        className = "CodeBlockTextarea"
        ref={ref}
        onChange={onChangehandle}
        value={code}
        readOnly = {isMentor}
        language="js"
        rows={4}
        cols={40}
        />
         {!isMentor && <button type='sumbit' onClick={onSaveChanges} className ="CodeBlockButton">
            Save Changes</button>}
        <Link to="/">Go Back</Link>
    </div>
    );
}

export default CodeBlock;