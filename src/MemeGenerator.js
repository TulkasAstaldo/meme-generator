import React, {Component} from "react"

class MemeGenerator extends Component {
    state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs:[]
     }
    
     componentDidMount() {
         fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({allMemeImgs:memes})
            })
     }
    
    
    
    
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]:value})
    }
    
    handleSubmit = (event) => {
        event.preventDefault()

        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })
    }
    
    clearText = (event) => {
        event.preventDefault()
        const {topText, bottomText} = event.target
        this.setState({
            topText: "",
            bottomText: ""
        })
    }    
    
    render() {
        return (
            <div id="container">
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input
                        type="text" 
                        name="topText" 
                        value={this.state.topText} 
                        placeholder="Top Text"
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text"
                        name="bottomText" 
                        value={this.state.bottomText} 
                        placeholder="Bottom Text"
                        onChange={this.handleChange}
                    />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt=""/>
                    <h2 className="top"> {this.state.topText} </h2> 
                    <h2 className="bottom"> {this.state.bottomText} </h2>
                </div>
                <button id="cleartxt" onClick={this.clearText}>Clear</button>
                
               
            </div>
        )
    }
}

export default MemeGenerator
