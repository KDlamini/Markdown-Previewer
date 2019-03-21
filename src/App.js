import React, { Component } from 'react';
import marked from 'marked';

const initialMarkdown = `
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

### List
- List item one
- List item two
- List item three

### Links
[FreeCodeCamp](https://learn.freecodecamp.org)

### Text Decorations
*italic*
**bold**
***bold and italic***

### Images
![alt text](https://ounews.co/wp-content/uploads/2018/01/IoC_Logo_OnBlue_AW-e1516713842221.jpg)

### BlockQuote
>Use your imagination. Your brain won't fall out.

### Code
\`npm install -g create-react-app\`

\`\`\`
function sumOfArray(arr) {
  let newArr =  arr.reduce((prev, curr) => {
    return prev + curr;
  })

  return newArr;
}
\`\`\`
`
var renderer = new marked.Renderer()

renderer.link = function(href, title, text) {
  return `<a href=${href} target="_blank">${text}</a>`
}

marked.setOptions({
  renderer,
  breaks: true
})

let editorPreviewStyle = {
  width: "100%",
  height: "100%",
  padding: ".5vw",
  margin: 0,
  border: "none",
  outline: "none"
}

function Editor(props) {

  let editorContainerStyle = {
    width: "60%",
    height:"80vh",
    margin: "auto"
  }
  return (
    <div className="editor-container" style={editorContainerStyle}>
      <textarea id="editor" value={props.markdown} onChange={props.handleChange} style={editorPreviewStyle}></textarea>
    </div>
  )
}

function Previewer(props) {

  let previewContainerStyle = {
    width: "80%",
    height: "90vh",
    margin: "auto",
    marginTop: "30px",
    overflow: "auto"
  }

  return (
    <div className="preview-container bg-light" style={previewContainerStyle}>
      <div id="preview" dangerouslySetInnerHTML={{__html: props.marked}} style={editorPreviewStyle} />
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        markdown: initialMarkdown
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      markdown: e.target.value
    })
  }

  render() {
    let hStyle = {
      textAlign: "center",
      color: "#FFFAFA",
      fontWeight: "bold"
    }
    return (
      <div>
        <h1 style={hStyle}>Markdown Previewer</h1>
        <Editor markdown={this.state.markdown} handleChange={this.handleChange}/>
        <Previewer marked = {marked(this.state.markdown)}/>
      </div>
    )
  }
}

export default App;