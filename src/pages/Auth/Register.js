import React from 'react'
import { useTranslation } from 'react-i18next'
import { useStyles } from '../../hooks'

import AuthNav from './AuthNav'

import styles from './Auth.module.css'
import { useForm } from 'react-hook-form'

const Register = () => {
  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'Auth.Register' })

  // -- Form
  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  })

  // -- Register action
  const onSubmit = data => {
    console.log('registering')
  }

  return (
    <main className={s('layout')}>
      <AuthNav login />
      <section className={s('form', 'card')}>
        <div className='card-header'>
          <h2>{t('HeadingRegister')}</h2>
        </div>
        <div className='card-body'>
          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor='username'
              className={`form-item input ${errors.username && 'invalid'}`}
            >
              <input
                type='text'
                className='input-field'
                id='username'
                placeholder={t('InputUsername')}
                {...register('username', {
                  required: t('ErrorRequired', { field: 'Username' })
                })}
              />
              <p className='input-label'>{t('InputUsername')}</p>
              <p className='input-error'>{errors?.username?.message}</p>
            </label>
            <label
              htmlFor='email'
              className={`form-item input ${errors.email && 'invalid'}`}
            >
              <input
                type='text'
                className='input-field'
                id='email'
                placeholder={t('InputEmail')}
                {...register('email', {
                  required: t('ErrorRequired', { field: 'Email' })
                })}
              />
              <p className='input-label'>{t('InputEmail')}</p>
              <p className='input-error'>{errors?.email?.message}</p>
            </label>
            <label
              htmlFor='password'
              className={`form-item input ${errors.password && 'invalid'}`}
            >
              <input
                type='password'
                className='input-field'
                id='password'
                placeholder={t('InputPassword')}
                {...register('password', {
                  required: t('ErrorRequired', { field: 'Password' })
                })}
              />
              <p className='input-label'>{t('InputPassword')}</p>
              <p className='input-error'>{errors?.password?.message}</p>
            </label>
            <label
              htmlFor='confirm-password'
              className={`form-item input ${
                errors.confirmPassword && 'invalid'
              }`}
            >
              <input
                type='password'
                className='input-field'
                id='confirm-password'
                placeholder={t('InputConfirmPassword')}
                {...register('confirmPassword', {
                  required: t('ErrorRequired', { field: 'Confirm password' })
                })}
              />
              <p className='input-label'>{t('InputConfirmPassword')}</p>
              <p className='input-error'>{errors?.confirmPassword?.message}</p>
            </label>
            <div className='form-item controls'>
              <button className='btn primary'>{t('ButtonRegister')}</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Register
