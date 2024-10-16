import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor({ value, onChange }) {

    return <ReactQuill
        theme="snow"
        value={value}
        onChange={(text) => {
            onChange(text)
        }}
    />;
}

export default TextEditor