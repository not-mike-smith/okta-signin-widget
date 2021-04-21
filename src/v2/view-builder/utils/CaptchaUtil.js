/*!
 * Copyright (c) 2017, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

const HCAPTCHA_PRIVACY_URL = 'https://hcaptcha.com/privacy';
const HCAPTCHA_TERMS_URL = 'https://hcaptcha.com/terms';

import { loc, _ } from 'okta';
import Enums from 'util/Enums';

function addHCaptchaFooter() {
  // NOTE: insetAdjacentHTML() is supported in all major browsers: 
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML#browser_compatibility
  document.getElementsByClassName(Enums.WIDGET_FOOTER_CLASS)[0].insertAdjacentHTML('beforeend',
    `<div class="captcha-footer">
        <span class="footer-text">${loc('captcha.footer.label', 'login', 
    [HCAPTCHA_PRIVACY_URL, HCAPTCHA_TERMS_URL])}</span>
      </div>`
  );
}

/**
 *  Bind the CAPTCHA to the specified form's submit button(s). This will hijack the submit button's normal
 *  event handler and render the CAPTCHA challenge instead. Upon solving it, the specified callback will be
 *  invoked.
 * @param {object} captchaConfig: The CAPTCHA configuration that includes the type and siteKey
 * @param {Form} form: The form that will be rendering the CAPTCHA
 * @param {Function} onCaptchaSolvedCallback: The callback to be invoked once CAPTCHA is solved
* */ 
export function renderCaptcha(captchaConfig, form, onCaptchaSolvedCallback) {
  // eslint-disable-next-line no-undef
  const captchaObject = captchaConfig.type === 'HCAPTCHA' ? hcaptcha : grecaptcha;

  // Iterate over all the primary buttons in the form and bind CAPTCHA to them
  _.each(form.$('.button-primary'), (elem) => {
    const captchaId = captchaObject.render(elem, {
      sitekey: captchaConfig.siteKey,
      callback: onCaptchaSolvedCallback
    });  
    
    // We attach the captchaId to the elem itself so that later on we can use it 
    // to reset the Captcha when needed.
    elem.setAttribute('data-captcha-id', captchaId);
  });

  // Render the HCAPTCHA footer - we need to do this manually since the hCAPTCHA lib doesn't do it
  if (captchaConfig.type === 'HCAPTCHA') {
    addHCaptchaFooter();
  }    
}

