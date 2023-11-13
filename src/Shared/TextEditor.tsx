import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import {Show} from "../Layout";

const PLUGINS = [
    'advlist autoresize table autolink lists link',
    'image charmap print preview anchor searchreplace visualblocks',
    'code fullscreen insertdatetime media emoticons table',
    'paste code help wordcount',
];

const TOOLBAR1 = 'undo redo | link image forecolor | formatselect | bold italic'
    + ' backcolor | alignleft aligncenter alignright alignjustify'
    + '  bullist table charmap numlist';

const TOOLBAR2 = 'code equation emoticons outdent indent | removeformat | help';

const apiKey = process.env.REACT_APP_TINY_MCE_API_KEY;

export function TextEditor(props: {
    imageInputId?: any,
    onChange: any,
    height: any,
    id: any,
    value: any,
    required?: boolean,
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const handleEditorChange = (content) => {
        props.onChange(content);
    };

    return (
        <>
            <Show when={!isLoaded}>
                <div>
                    <Spinner animation="border" variant="primary" size="sm" />
                </div>
            </Show>
            <Editor
                apiKey={apiKey}
                init={{
                    isRequired: props.required,
                    stopImmediatePropagation: true,
                    enforceFocus: false,
                    height: props.height,
                    menubar: false,
                    plugins: PLUGINS,
                    toolbar1: TOOLBAR1,
                    toolbar2: TOOLBAR2,
                    image_advtab: true,
                    file_browser_callback_types: 'image',
                }}
                id={props.id}
                value={props.value}
                textareaName={props.imageInputId}
                onEditorChange={handleEditorChange}
                onInit={() => setIsLoaded(true)}
            />
        </>
    );
}

TextEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
};

TextEditor.defaultProps = {
    value: null,
    required: false,
    imageInputId: '',
};
