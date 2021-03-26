import React, { FunctionComponent, ChangeEvent } from 'react';
import { CircularProgress } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { useIntl } from 'react-intl';
import InputField from 'components/InputField';
import FixedBottomButton from 'components/FixedBottomButton';
import { Formik } from 'formik';
import { useValidateForm, FormValues } from './lib/useValidateForm';
import {
  useCityAndCountryAutocomplete,
  CityOrCountry,
  getCityOrCountryLabel,
} from './lib/useCityAndCountryAutocomplete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { InputFieldWrapper } from 'components/InputField/InputField.style';
import { ValidateButtonContainer } from 'components/Modal/Modal.style';

interface CreateAccountFormProps<OtherFormValues> {
  AdditionalFields?: FunctionComponent<{
    onChange: (e: ChangeEvent) => void;
    values: OtherFormValues & FormValues;
  }>;
  onValidate: () => void;
}

const CreateAccountForm = <OtherFormValues,>({
  AdditionalFields,
  onValidate,
}: CreateAccountFormProps<OtherFormValues>) => {
  const intl = useIntl();
  const { validateForm } = useValidateForm<OtherFormValues>();
  const { cities, fetchCities, isFetchingCities } = useCityAndCountryAutocomplete();

  return (
    <Formik
      initialValues={{} as FormValues & OtherFormValues}
      validate={validateForm}
      onSubmit={onValidate}
    >
      {// eslint-disable-next-line complexity
      ({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        touched,
        setFieldValue,
        setFieldTouched,
      }) => (
        <form onSubmit={handleSubmit}>
          <InputFieldWrapper>
            <InputField
              placeholder={intl.formatMessage({ id: 'login_modal.first-name' })}
              type="text"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              error={touched.firstName === true && errors.firstName !== undefined}
              helperText={touched.firstName === true ? errors.firstName : undefined}
            />
          </InputFieldWrapper>
          <InputFieldWrapper>
            <InputField
              placeholder={intl.formatMessage({ id: 'login_modal.email-address' })}
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email === true && errors.email !== undefined}
              helperText={touched.email === true ? errors.email : undefined}
            />
          </InputFieldWrapper>
          <InputFieldWrapper>
            <Autocomplete
              freeSolo
              options={cities}
              getOptionLabel={getCityOrCountryLabel}
              onBlur={() => setFieldTouched('cityId', true)}
              onChange={(e, value) => {
                setFieldValue('cityId', (value as CityOrCountry)?.uuid || '');
              }}
              renderInput={(params: TextFieldProps) => (
                <InputField
                  {...params}
                  placeholder={intl.formatMessage({ id: 'login_modal.city-or-country' })}
                  error={touched.cityId === true && errors.cityId !== undefined}
                  helperText={touched.cityId === true ? errors.cityId : undefined}
                  onChange={e => {
                    handleChange(e);
                    setFieldValue('cityId', '');
                    fetchCities(e.target.value);
                  }}
                  onBlur={handleBlur}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isFetchingCities ? <CircularProgress color="primary" size={20} /> : null}
                        {params?.InputProps?.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </InputFieldWrapper>
          {AdditionalFields !== undefined ? (
            <AdditionalFields onChange={handleChange} values={values} />
          ) : null}
          <ValidateButtonContainer>
            <FixedBottomButton
              disabled={
                isSubmitting ||
                Object.keys(errors).length > 0 ||
                touched.firstName !== true ||
                touched.email !== true ||
                touched.cityId !== true
              }
              type="submit"
            >
              {intl.formatMessage({ id: 'login_modal.validate' })}
            </FixedBottomButton>
          </ValidateButtonContainer>
        </form>
      )}
    </Formik>
  );
};

export default CreateAccountForm;
