/*
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { transformer } from 'src/transformer/field/uischema/options/visible';
import { IonFormField } from 'src/types/ion';

describe('"visible" field transformer', () => {
  it('should return uischema object with options.type === "hidden" field inside if formfield.secret === false', () => {
    const formfield: IonFormField = { name: 'testField', visible: false };
    const result = { type: 'hidden' };
    expect(transformer(formfield)).toEqual(result);
  });

  it('should return null if formfield not include "visible" field or formfield.visible === true', () => {
    const formfieldSecretFalse: IonFormField = { name: 'testField', visible: true };
    const formfieldNoneSecret: IonFormField = { name: 'testField' };
    const result = null;

    expect(transformer(formfieldSecretFalse)).toEqual(result);
    expect(transformer(formfieldNoneSecret)).toEqual(result);
  });
});