import React from 'react'
// import logo from '../assets/logo.svg'
import '../styles/App.scss'

class App extends React.Component {
	constructor() {
		super()
		this.state = { camera: true, recordedBlobs: [] }
		this.toggle = this.toggle.bind(this)
		this.fireCheck = this.fireCheck.bind(this)
	}
	componentDidMount() {
		document.getElementById('root').style.display = 'none'
		this.setState({ camera: true })
		let processed = document.getElementById('processed')
		processed.addEventListener('change', this.toggle)
	}

	fireCheck() {
		let processed = document.getElementById('processed')
		if (this.state.camera === true) {
			processed.addEventListener('change', this.toggle)
			window.processed = processed
		} else {
			processed.removeEventListener('change', this.toggle)
		}
	}

	toggle() {
		if (this.state.camera === false) {
			document.getElementById('root').style.display = 'none'
			document.getElementById('application').style.display = 'block'
			this.setState({ camera: true }, () => this.fireCheck())
		} else {
			document.getElementById('root').style.display = 'block'
			document.getElementById('application').style.display = 'none'
			this.setState({ camera: false }, () => {
				this.fireCheck()
				this.displayVideo()
			})
		}
	}

	displayVideo() {
		let recordedBlobs = window.recordedBlobs
		this.setState({ recordedBlobs })
		const superBuffer = new Blob(recordedBlobs, { type: 'video/webm' })
		let video = document.createElement('video')
		video.setAttribute('controls', 'controls')
		video.setAttribute('height', 480)
		video.setAttribute('width', 640)
		video.setAttribute('preload', 'none')
		video.setAttribute('loop', 'loop')
		video.classList.add('add-video')

		video.src = window.URL.createObjectURL(superBuffer)
		console.log(video)
		video.play()
		// video.style.display = 'none'
		document.getElementById('videos').appendChild(video)

		// const canvas = document.querySelector('canvas')
		// const ctx = canvas.getContext('2d')
		// video.addEventListener('play', () => {
		// 	function step() {
		// 		ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
		// 		requestAnimationFrame(step)
		// 	}
		// 	requestAnimationFrame(step)
		// })
		// window.ctx=ctx
	}

	render() {
		return (
			<React.Fragment>
				<div className='App'>
					<button onClick={this.toggle}>Open Camera Tray.</button>
				</div>
				<div className='parent-div' id='videos'></div>
				<canvas height='300'></canvas>
				<button>Publish</button>
			</React.Fragment>
		)
	}
}

export default App
