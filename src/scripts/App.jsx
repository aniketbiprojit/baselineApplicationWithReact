import React from 'react'
// import logo from '../assets/logo.svg'
import '../styles/App.scss'

class App extends React.Component {
	constructor() {
		super()
		this.state = { camera: true, recordedBlobs: [], gray_percent: 0, contrast_percent:100 }
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

		let video = document.getElementById('add-video')
		video.setAttribute('controls', 'controls')
		video.setAttribute('height', 480)
		video.setAttribute('width', 640)
		video.setAttribute('preload', 'none')
		video.setAttribute('loop', 'loop')
		video.classList.add('add-video')

		video.src = window.URL.createObjectURL(superBuffer)
		console.log(video)
		video.play()

		// const canvas = document.getElementById('canvas_video')
		// const ctx = canvas.getContext('2d')

		// let flag = true
		// video.addEventListener('playing', () => {
		// 	function step() {
		// 		console.log('step')
		// 		ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
		// 		requestAnimationFrame(step)
		// 	}
		// 	if (flag) requestAnimationFrame(step)
		// 	flag=false
		// })
		// window.ctx = ctx
	}

	render() {
		return (
			<React.Fragment>
				<div className='App'>
					<button onClick={this.toggle}>Open Camera Tray.</button>
				</div>
				<div className='parent-div' id='videos'>
					<video
						style={{
							filter: `grayscale(${this.state.gray_percent}%) contrast(${this.state.contrast_percent}%)`,
						}}
						id='add-video'
						className='add-video'
					></video>
				</div>
				<button
					id='increase_gray'
					onClick={() => {
						let gray_percent = this.state.gray_percent + 5
						this.setState({ gray_percent })
					}}
				>
					increase_gray
				</button>
				<button
					id='decrease_gray'
					onClick={() => {
						let gray_percent = this.state.gray_percent - 5
						this.setState({ gray_percent })
					}}
				>
					decrease_gray
				</button>
				{this.state.gray_percent}
				<br/>

				<button
					id='increase_contrast'
					onClick={() => {
						let contrast_percent = this.state.contrast_percent + 5
						this.setState({ contrast_percent })
					}}
				>
					increase_contrast
				</button>
				<button
					id='decrease_contrast'
					onClick={() => {
						let contrast_percent = this.state.contrast_percent - 5
						this.setState({ contrast_percent })
					}}
				>
					decrease_contrast
				</button>
				{this.state.contrast_percent}
				<br/>
				<button>Publish</button>
			</React.Fragment>
		)
	}
}

export default App
