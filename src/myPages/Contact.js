/** The About page, explaining the site */
import React from 'react'
import { Titled } from 'react-titled'
import NetlifyForm from 'react-netlify-form'

import CMSItemLoader from 'myComponents/CMSItemLoader'
import MarkdownRenderer from 'myComponents/MarkdownRenderer'
import MenuWrapper from 'myComponents/MenuWrapper'
import WideLogo from 'myComponents/WideLogo'

import './Contact.css'

/**
 * Render all content wrapped by menus/navigation.
 * navSlideClass is a CSS that will make content slide when the mobile nav slides in.
 */
const Contact = ({ navSlideClass, previewData }) => (
  <div className={`tng-About ${navSlideClass}`}>
    { /* Tab Title */ }
    <Titled title={title => `About | ${title}`} />

    { /* Top Logo */ }
    <WideLogo className='u-mobileOnly' containerHeight='60px' logoWidth='250px' />

    { /* Main Content */ }
    <section className='tng-About-content'>
      <CMSItemLoader
        description='page text'
        itemPath='pages/contact.json'
        previewData={previewData}
        renderOnData={data =>
          <div>
            <div
              className='tng-About-mainImage'
              style={{ backgroundImage: `url(${data.mainImage})` }}
            />
            <div className='tng-About-title'>About</div>
            <main className='tng-About-text'>
              <MarkdownRenderer md={data.body || ''} />
            </main>
            <NetlifyForm name='Contact Form'>
              {({ loading, error, success }) => (
                <div>
                  {loading &&
                    <div>Loading...</div>
                  }
                  {error &&
                    <div>Your information was not sent. Please try again later.</div>
                  }
                  {success &&
                    <div>Thank you for contacting us!</div>
                  }
                  {!loading && !success &&
                    <div>
                      <input type='text' name='Name' required />
                      <textarea name='Message' required />
                      <button>Submit</button>
                    </div>
                  }
                </div>
              )}
            </NetlifyForm>
          </div>
        }
      />
    </section>
  </div>
)

/** A wrapper around page content with the menus/navigation */
const ContactWrapper = (props) => (
  <MenuWrapper render={Contact} {...props} />
)

export default ContactWrapper
