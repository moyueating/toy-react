import { Component, render, createElement } from './toy-react'
 
class App extends Component {
    render(){
        return <div>
            <h1>my component title</h1>
            {this.children}
        </div>
    }
}

render(<App>
    <div>text1</div>
    <div>text2</div>
    <div>text3</div>
</App>, document.body)
