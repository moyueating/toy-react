class ElementWrapper {
    constructor(type){
        this.root = document.createElement(type)
    }
    setAttribute(name, value){
        this.root.setAttribute(name, value)
    }
    appendChild(component){
        this.root.appendChild(component.root)
    }
}

class TextWrapper{
    constructor(content){
        this.root = document.createTextNode(content);
    }
}

export class Component {
    constructor(){
        this.props = Object.create(null);
        this.children = []
        this._root = null;
    }
    setAttribute(name, value){
        this.props[name] = value
    }
    appendChild(component){
        // 将App的chidren保存，在调用render()的时候当做参数传入createElement(div, null, this.children)
        this.children.push(component)
    }
    get root(){
        if(!this._root){
            this._root = this.render().root
        }
        return this._root
    }
}

export function createElement(type, attributes, ...children){
    let ele;
    if(typeof type === 'string'){
        ele = new ElementWrapper(type)
    }else{
        ele = new type();
    }
    for(let a in attributes){
        ele.setAttribute(a, attributes[a])
    }
    let insertChildren = (children) => {
        for (const child of children) {
            if(typeof child === 'string'){
                child = new TextWrapper(child)
            }
            if(Array.isArray(child)){
                insertChildren(child)
            }else{
                ele.appendChild(child)
            }
        }
    }
    insertChildren(children)
    return ele
}


export const render = (component, parentElement) => {
    // 这里获取component.root触发getter完成render执行返回真正的dom
    parentElement.appendChild(component.root)
}
    