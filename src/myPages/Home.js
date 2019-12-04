/** The home page of our site */
import React, { useEffect, Component } from 'react'
import { Titled } from 'react-titled'
//
import ArticlesList from 'myComponents/ArticlesList'
import CMSItemLoader from 'myComponents/CMSItemLoader'
import HomeDesktopNav from './home/HomeDesktopNav'
import MenuWrapper from 'myComponents/MenuWrapper'
import PageLinks from 'myComponents/PageLinks'
import WideLogo from 'myComponents/WideLogo'
// Images
import interface3 from '../myAssets/images/interface3.png'
import interface2 from '../myAssets/images/interface2.png'
import interface1 from '../myAssets/images/interface1.png'
// P5 Canvas Blobs
import Blob from '../myComponents/Blob'
import BlobGreen from '../myComponents/BlobGreen'
import BlobHeader from '../myComponents/BlobHeader'
// RC Slider
import Slider, { Range, createSliderWithTooltip } from 'rc-slider'
import Tooltip from 'rc-tooltip'
import 'rc-slider/assets/index.css'
// GSAP Tween
import { TweenLite, Expo, Linear } from "gsap"
// Mailchimp email subscription
import Mailchimp from 'react-mailchimp-form'
import './Home.css'



/**
 * Render all content wrapped by menus/navigation.
 * navSlideClass is a CSS that will make content slide when the mobile nav slides in.
 */
const Home = ({ navSlideClass, match }) => {
  const pageNum = match.params.pageNum || '1'
  const Handle = Slider.Handle

/*
  useEffect(() => {
    //const formEmail = document.getElementsByClassName("formEmail")
    const homeTitle = document.getElementById("homeTitle")
    const homeSubTitle = document.getElementById("homeSubTitle")
    const homeHeaderBody = document.getElementById("homeHeaderBody")
    const headerInterfaceImage = document.getElementById("headerInterfaceImage")
    TweenLite.fromTo(homeTitle, 2,{y:"20px",opacity:"0"}, {y:"0px",opacity:"1", ease: Expo.easeOut, delay:.1})
    TweenLite.fromTo(homeSubTitle, 2,{y:"20px",opacity:"0"}, {y:"0px",opacity:"1", ease: Expo.easeOut, delay:.4})
    TweenLite.fromTo(homeHeaderBody, 2,{opacity:"0"}, {opacity:"1", ease: Linear, delay:.4})
    //TweenLite.fromTo(formEmail, 1.8,{y:"20px"}, {y:"120px", ease: Linear, delay:.1})
    TweenLite.fromTo(headerInterfaceImage, 1.8,{y:"400px",opacity:"0"}, {y:"55px",opacity:"1" , ease: Linear, delay:.1})
  }, [])
*/

  const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <div>
        <div>
          <label> </label>
            <label
              className="bodyText"
              style={{marginTop:"80px" , marginBottom:"120px" }}
            > &nbsp;
            </label>
        </div>
    </div>
    )
  }

  return (


    <div className={`tng-Home ${navSlideClass}`}>
      { /* Tab Title */ }
      {pageNum !== '1' &&
        <Titled title={title => `page ${pageNum} | ${title}`} />
      }

      { /* Top Logo */ }
      <WideLogo className='u-mobileOnly' containerHeight='75px' logoWidth='300px' />
      <WideLogo className='u-desktopOnly' containerHeight='75px' logoWidth='400px' />

      { /* Navigation for Desktop Screen Width */ }
      <HomeDesktopNav />

      { /* Page Number */ }
      {pageNum !== '1' &&
        <div className='tng-Home-pageNum'>page {pageNum}</div>
      }

      {/* Page Articles */}
      <CMSItemLoader
        description='articles list'
        itemPath={`generated/home/${pageNum}.json`}
        renderOnData={({ pageArticles, links }) =>
          <div>
            { /* Articles List */ }






                <section className="section section--gradient">
                  <BlobHeader
                    id="headerBlob"
                    className="centerBlob"
                    style={{ margin: "auto", width: "50%" }}
                  />
                  <div className="container">
                    <div className="columns">
                      <div className="column is-10 is-offset-1">
                        <div className="section">

                          <h2
                            id="homeTitle"
                            className="startOpacity"
                            data-scroll data-scroll-speed="3"
                            data-scroll-position="top"
                            style={{ color: '#1365F4', marginTop: "40px", textAlign: "center" }}
                          >
                            Data driven decision support
                          </h2>
                          <h2
                            id="homeSubTitle"
                            className="startOpacity"
                            data-scroll data-scroll-speed="2"
                            data-scroll-position="top"
                            style={{ color: '#BFC5D2', marginBottom: "100px", textAlign: "center" }}
                          >
                            for aquaculture
                          </h2>
                          <div
                            id="homeHeaderBody"
                            className="startOpacity titleText"
                          >
                            Bioplan's algorithms represent the state-of-the-art in production optimisation. They are the result of many years of in-depth research and development, both in-house and at the Norwegian University of Science and Technology in Trondheim, Norway.
                          </div>
                          <Mailchimp
                            action='https://<YOUR-USER>.us16.list-manage.com/subscribe/post?u=XXXXXXXXXXXXX&amp;id=XXXXXX'
                            fields={[
                              {
                                name: 'EMAIL',
                                placeholder: 'Your e-mail address',
                                type: 'email',
                                required: true
                              }
                            ]}
                            messages = {
                              {
                                sending: "Sending...",
                                success: "Thank you for subscribing!",
                                error: "An unexpected internal error has occurred.",
                                empty: "You must write an e-mail.",
                                duplicate: "Too many subscribe attempts for this email address",
                                button: "Request Access"
                              }
                            }
                            className='formEmail'
                          />
                          <img
                            id="headerInterfaceImage"
                            className="startOpacity"
                            data-scroll
                            data-scroll-speed="1"
                            data-scroll-direction="vertical"
                            src={interface2}
                            style={{ marginBottom: "120px" }}
                          />

                          <div className="is-inview homeBlock flexContainer">
                            <BlobGreen/>
                              <img
                                data-scroll
                                data-scroll-speed="-1"
                                data-scroll-direction="horizontal"
                                src={interface2}
                                style={{ marginTop: "55px", position: "absolute", marginLeft: "-530px", height: "400px" }}
                              />
                            <div className="textBlock">
                              <h2
                                style={{ color: '#12E1C4' }}
                              >Easy</h2>
                              <h2>
                                Planning
                              </h2>
                              <div className="bodyText">
                                Bioplan's algorithms represent the state-of-the-art in production optimisation. They are the result of many years of in-depth research and development, both in-house and at the Norwegian University of Science and Technology in Trondheim, Norway.
                              </div>
                            </div>
                          </div>

                          <div className="is-inview homeBlock flexContainer">
                            <div className="textBlockLeft">
                              <h2
                                style={{ color: '#1365F4' }}
                              >
                                Advanced
                              </h2>
                              <h2
                              >
                                Modeling
                              </h2>
                              <div className="bodyText">
                                Bioplan's algorithms represent the state-of-the-art in production optimisation. They are the result of many years of in-depth research and development, both in-house and at the Norwegian University of Science and Technology in Trondheim, Norway.
                              </div>
                            </div>
                            <div>
                              <img
                                data-scroll
                                data-scroll-speed="1"
                                data-scroll-direction="horizontal"
                                src={interface2}
                                style={{ marginTop: "50px", position: "absolute", marginLeft: "70px", height: "400px" }}
                              />
                            <Blob/>
                          </div>
                          </div>

                          <div className="is-inview homeBlock flexContainer">
                            <BlobGreen/>
                              <img
                                data-scroll
                                data-scroll-speed="-1"
                                data-scroll-direction="horizontal"
                                src={interface2}
                                style={{ marginTop: "50px", position: "absolute", marginLeft: "-530px", height: "400px" }}
                              />
                            <div className="textBlock">
                              <h2
                                style={{ color: '#12E1C4' }}
                              >
                                Fast
                              </h2>
                              <h2
                              >
                                Execution Time
                              </h2>
                              <div className="bodyText">
                                Bioplan's algorithms represent the state-of-the-art in production optimisation. They are the result of many years of in-depth research and development, both in-house and at the Norwegian University of Science and Technology in Trondheim, Norway.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DynamicBounds/>
                </section>







            <ArticlesList articles={pageArticles} />
            {/* Links To Other Pages */}
            <PageLinks links={links} />
          </div>
        }
      />
    </div>
  )
}


class DynamicBounds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 300000,
      step: 100,
      value: 200000,
    };
  }
  onSliderChange = (value) => {
    this.setState({value});
  }
  onMinChange = (e) => {
    this.setState({
      min: +e.target.value || 0,
    });
  }
  onMaxChange = (e) => {
    this.setState({
      max: +e.target.value || 100,
    });
  }
  onStepChange = (e) => {
    this.setState({
      step: +e.target.value || 1,
    });
  }

  render() {
    const labelStyle = { minWidth: '60px', display: 'inline-block', fontSize: '40px', letterSpacing: '-2.0px' , color: '#A3A9B6'}
    const inputStyle = { marginBottom: '10px'}
    const sliderWidth = { width: '900px', margin: 'auto', marginTop: '100px', marginBottom: '300px' }
    const labelGroup = { marginTop: '85px', marginBottom: '20px' }
    const SliderWithTooltip = createSliderWithTooltip(Slider);

    return (
      <div style={sliderWidth}>
        <div>
          <h2
            style={{ color: '#1365F4' }}
          >
            5% Optimized
          </h2>
          <h2
          >
            Production
          </h2>
          <div className="bodyText">
            They are the result of many years of in-depth research and development, both in-house and at the Norwegian University of Science and Technology in Trondheim, Norway.
          </div>
        </div>

        <br /><br /><br /><br /><br />
        <Slider
          value={this.state.value}
          min={this.state.min}
          max={this.state.max}
          step={this.state.step}
          onChange={this.onSliderChange}
          trackStyle={{
            backgroundColor: '#1365f4',
            height: 10
          }}
          handleStyle={{
            borderColor: '#1365f4',
            height: 28,
            width: 28,
            marginLeft: -14,
            marginTop: -9,
            backgroundColor: '#1365f4'
          }}
          railStyle={{
            backgroundColor: '#fff',
            height: 10,
            boxShadow: '0 0 25px #e0e9f7'
          }}
          activeDotStyle={{
            borderColor: '#1365f4',
            boxShadow: 0
          }}
        />
        <div style={labelGroup}>
          <div style={{ marginBottom: '4px'}}>
            <h2 style={labelStyle}>Overall   </h2>
            <h2 style={labelStyle}> &nbsp;<span style={{color: '#44516B'}}>{this.state.value}</span> tonn</h2>
          </div>
          <div>
            <h2 style={labelStyle}>Optimized    </h2>
            <h2 style={labelStyle}> &nbsp;<span style={{color: '#1365F4'}}>{this.state.value/20}</span> tonn</h2>
          </div>
        </div>
      </div>
    );
  }
}


/** A wrapper around page content with the menus/navigation */
const HomeWrapper = (props) => (
  <MenuWrapper mobileOnly render={Home} {...props} />
)

export default HomeWrapper
