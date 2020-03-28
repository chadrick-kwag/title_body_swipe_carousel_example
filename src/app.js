import React from 'react'
import ReactDOM from 'react-dom'
import './app.css'
import { useSwipeable, Swipeable } from 'react-swipeable'

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [
                {
                    title: 'title 1',
                    body: 'body 1'
                },
                {
                    title: 'title 2',
                    body: 'body2'
                },
                {
                    title: 'title 3',
                    body: 'body3'
                }
            ],
            showindex: 2
        }

        this.title_card_arr = []

        this.move_title_carousel_scroll = this.move_title_carousel_scroll.bind(this)
    }

    move_title_carousel_scroll() {

        // get scroll position to selected item index
        let sel_title_card = this.title_card_arr[this.state.showindex]
        let sel_tcard_left = sel_title_card.offsetLeft
        console.log(sel_tcard_left)
        let sel_tcard_width = sel_title_card.offsetWidth
        let goto_pos = sel_tcard_left + (sel_tcard_width / 2)

        let holder_width = this.title_carousel_holder.offsetWidth
        goto_pos -= (holder_width / 2)
        console.log('goto_pos: ' + goto_pos)
        this.title_carousel_holder.scrollLeft = goto_pos
    }

    componentDidMount() {
        this.move_title_carousel_scroll()
    }

    componentDidUpdate() {
        this.move_title_carousel_scroll()
    }

    render() {

        const body_swipe_left_fn = (e)=>{
            let new_show_index = this.state.showindex - 1
            if(new_show_index>=0){
                this.setState({showindex: new_show_index})
            }
        }

        const body_swipe_right_fn = (e)=>{
            let new_show_index = this.state.showindex +1
            if(new_show_index >= this.state.data.length){
                return
            }

            this.setState({showindex: new_show_index})

        }

        return (
            <div className='main-holder'>
                <div className="title-carousel-holder" ref={el => this.title_carousel_holder = el}>
                    <div className="title-carousel" ref={el => this.title_carousel = el}>
                        <div className='empty-title-card'> </div>
                        {this.state.data.map((d, i) => {
                            let classname = "title-card"
                            if(i==this.state.showindex){
                                classname += ' title-card-selected'
                            }
                            return <div className={classname} key={"title-card-" + i} ref={el => this.title_card_arr.push(el)}
                                onClick={e=>this.setState({showindex: i})}
                            >{d.title}</div>
                        })}
                        <div className='empty-title-card'> </div>
                    </div>
                </div>
                <div className="body-carousel">
                    <Swipeable className='body-card' onSwipedLeft={body_swipe_right_fn} onSwipedRight={body_swipe_left_fn}>

                    {/* <div className='body-card'> */}

                        {this.state.data[this.state.showindex].body}
                    {/* </div> */}
                    </Swipeable>
                </div>

                {/* <div>
                    {this.state.data.map((d, i) => {
                        return <button onClick={e => this.setState({ showindex: i })}>{i}</button>
                    })}
                </div> */}

            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))