import React, { Component, Fragment } from "react";
import ReactSiema from "./lib";

export default class ReactSiemaCarousel extends Component {
  constructor(props) {
    super(props);
    this.gotoNext = this.gotoNext.bind(this);
    this.renderDots = this.renderDots.bind(this);
    this.onDotClick = this.onDotClick.bind(this);
    this.updateAfterDrag = this.updateAfterDrag.bind(this);
    this.setAutoCarousel = this.setAutoCarousel.bind(this);
    this.unsetAutoCarousel = this.unsetAutoCarousel.bind(this);

    this.slider = null;
    this.state = {
      total: React.Children.count(this.props.children),
      perPage: 1,
      current: 0,
      activeDotIndex: 0
    };
  }
  componentDidMount() {
    this.setState({
      current: this.refs.slider.currentSlide,
      perPage: this.refs.slider.getPerPage()
    });
    if (this.props.auto) this.setAutoCarousel();
  }

  componentWillUnmount() {
    this.unsetAutoCarousel();
  }

  updateAfterDrag() {
    this.setState({
      current: this.refs.slider.currentSlide
    });
  }

  gotoNext() {
    this.refs.slider.next();
    this.setState({
      current: this.refs.slider.currentSlide
    });
  }

  gotoPrev() {
    this.refs.slider.prev();
    this.setState({
      current: this.refs.slider.currentSlide
    });
  }

  onDotClick(dotIndex) {
    let perPage = this.state.perPage;
    let current = dotIndex * perPage;
    let total = this.state.total;

    this.setState({
      current: current
    });

    if (perPage + current > total) {
      current = total - perPage;
    }

    this.refs.slider.goTo(current);
  }

  setAutoCarousel() {
    setInterval(this.gotoNext, 3000);
  }

  unsetAutoCarousel() {
    clearInterval(this.gotoNext);
  }

  renderDots() {
    if (this.state.perPage === 0) {
      return <div />;
    }
    let dotCount = Math.ceil(this.state.total / this.state.perPage);
    let dots = [];

    let total = this.state.total;
    let current = this.state.current;
    let perPage = this.state.perPage;
    let dotIndex = Math.floor(current / perPage);
    if (current + perPage >= total) {
      dotIndex = dotCount - 1;
    }

    if (dotCount === 1) {
      return <div />;
    }

    for (let i = 0; i < dotCount; i++) {
      let className = i === dotIndex ? "active" : "";
      dots.push(
        <button
          key={i}
          onClick={() => this.onDotClick(i)}
          className={`slider-dot ${className}`}
          aria-hidden="true"
          role="button"
        />
      );
    }
    return dots;
  }

  render() {
    return (
      <Fragment>
        <ReactSiema
          ref="slider"
          onResize={perPage => {
            this.setState({
              perPage: perPage
            });
          }}
          updateAfterDrag={this.updateAfterDrag}
          {...this.props}
        >
          {this.props.children}
        </ReactSiema>
        {this.props.controls !== false && (
          <div className="slider-nav text-center">
            <button
              className="left-arrow btn btn-link"
              aria-hidden="true"
              role="button"
              onClick={() => this.gotoPrev()}
            >
              {/*<i className="simple-icon-arrow-left" />*/}
            </button>
            <div className="slider-dot-container">{this.renderDots()}</div>
            <button
              className="left-arrow btn btn-link"
              aria-hidden="true"
              role="button"
              onClick={() => this.gotoNext()}
            >
              {/*<i className="simple-icon-arrow-right" />*/}
            </button>
          </div>
        )}
      </Fragment>
    );
  }
}
