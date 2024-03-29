/* Ticker component adapted from https://mikefrancis.dev/
*/
import React from 'react';
import styled from "styled-components"

const StyledTicker = styled.div`
  position: relative;
  overflow: hidden;

  .inner {
    position: absolute;
    width: 100%;
  }

  .item {
    display: block;
  }
`;

class Ticker extends React.Component {

  itemRefs = [];

  constructor(props) {
    super(props);

    props.items.map(() => this.itemRefs.push(React.createRef()));

    this.state = {
      current: 0,
      height: 0,
      top: 0,
      total: props.items.length
    };
  }

  componentDidMount() {
    const { delay, items } = this.props;

    if (!this.itemRefs[0].current) {
      return;
    }

    const height = this.itemRefs[0].current.clientHeight;

    this.setState({
      height
    });

    setInterval(() => {
      const { current } = this.state;

      if (current === items.length - 1) {
        this.setState({
          current: 0,
          top: 0
        });
        return;
      }

      this.setState(prevState => ({
        current: prevState.current + 1,
        top: prevState.top - prevState.height
      }));
    }, delay);
  }
  render() {
    const { height, top } = this.state;

    const { easing, items, speed } = this.props;

    const sliderStyle = {
      transform: `translateY(${top}px)`,
      transition: `transform ${easing} ${speed}ms`
    };
    return (
      <StyledTicker className="text-orange-600" style={{ height: height + "px" }}>
        <div className="inner text-mint-green font-black" style={sliderStyle}>
          {items.map((item, i) => (
            <span ref={this.itemRefs[i]} key={i} className="item">
              {item}
            </span>
          ))}
        </div>
      </StyledTicker>
    );
  }
}

export default Ticker;