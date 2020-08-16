import React from 'react';
import {Component} from 'react';
import './carousel.css';

class Carousel extends Component{
    constructor(props){
        super(props);
        this.width = this.props.width;
        this.height = this.props.height;
        this.state = {
            left:100,
            transition:true,
        }
        this.gotoPic = this.gotoPic.bind(this);
        this.next = this.next.bind(this);
        this.last = this.last.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.render = this.render.bind(this);
        this.curPic = 0;
        this.picNum = this.props.pictures.length;
        this.aniTimeout = undefined;

    }
    componentDidMount(){
        const {aniTime,keepTime} = this.props;
        const _this = this;
        this.interVal = setInterval(()=>{
            _this.nextPage(aniTime)
        },aniTime+keepTime);
    }

    nextPage(aniTime){
        if(this.picNum<=1){
            return ;
        }
        const {left} = this.state;
        const _this = this;
        this.curPic = (this.curPic+1)%this.picNum;

        this.setState({
            ...this.state,
            left:left+100,
            transition:true
        })
        if(_this.curPic===0){    
            _this.aniTimeout = setTimeout(()=>{
                _this.setState({
                    ..._this.state,
                    left:100,
                    transition:false,
                })
                _this.aniTimeout = undefined;
            },aniTime);
        }
    }
    
    gotoPic(index){
        this.curPic = index;
        if(this.aniTimeout){
            clearTimeout(this.aniTimeout);
        }
        clearInterval(this.interVal);
        this.setState({
            ...this.state,
            left:(this.curPic+1)*100,
            transition:true,
        });
        const {aniTime,keepTime} = this.props;
        const _this = this;
        this.interVal = setInterval(()=>{
            _this.nextPage(aniTime)
        },aniTime+keepTime);
    }

    next(){
        if(this.picNum<=1){
            return ;
        }
        this.curPic = (this.curPic+1)%this.picNum;

        this.gotoPic(this.curPic);
    }

    last(){
        if(this.picNum<=1){
            return ;
        }
        this.curPic--;
        if(this.curPic<0){
            this.curPic = this.picNum-1;
        }

        this.gotoPic(this.curPic);
    }

    render(){
        const {pictures,aniTime} = this.props;
        const {left,transition} = this.state;
        const imgListStyle = {
            width:100*(this.picNum+2)+'%',
            height:'100%',
            position:'relative',
            left:'-'+left+'%',
            transition:transition?`all linear ${aniTime/1000}s`:'none',
        }
        const containerStyle = {
            width:this.width?this.width+'px':'100%',
            height:this.height?this.height+'px':'100%'
        }
        const liStyle = {
            width:100/(this.picNum+2)+'%'
        }
        
        
        return (
            <div id="container" style={containerStyle}>
                <button id="last-btn" className="hidden-btn" onClick={()=>this.last()}>&lt;</button>
                <button id="next-btn" className="hidden-btn" onClick={()=>this.next()}>&gt;</button>
                <ul id="imgs" style={imgListStyle}>
                    {(pictures.length>1)?
                        (<li style={liStyle} key={-1}>
                            <a className="img-a">
                                <img src={pictures[pictures.length-1].src}  alt={pictures[0].alt}></img>
                            </a>
                        </li>):
                        undefined
                    }
                    {pictures.map((pic,index)=>{
                        return (
                            <li style={liStyle} key={index} >
                                <a className="img-a" href={pic.href}>
                                    <img src={pic.src} alt={pic.alt}></img>
                                </a>
                            </li>);
                    })}
                    {(pictures.length>1)?
                        (<li style={liStyle} key={pictures.length}>
                            <a className="img-a">
                                <img src={pictures[0].src} alt={pictures[0].alt}></img>
                            </a>
                        </li>):
                        undefined
                    }
                </ul>
                <ul id="btns">
                    {pictures.map((pic,index)=>{
                        return (
                            <li key={index}>
                                <button onClick={()=>this.gotoPic(index)} className={(index===this.curPic)?'active':'not-active'}></button>
                            </li>);
                    })}
                </ul>
            </div>

        )
    }
}

export default Carousel;