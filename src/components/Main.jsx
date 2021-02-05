import React, { Component } from 'react'
import NavBar from './mainView/NavBar'
import Video from './mainView/Video'

import '../assets/css/style.css'

export default class Main extends Component {
    render() {
        return (
            <div>
                <NavBar></NavBar>
                <Video></Video>
            </div>
        )
    }
}
