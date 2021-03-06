import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { useGlobal, useStyles } from '../../hooks'

import AuthNav from './AuthNav'

import styles from 'styles/Auth.module.css'
import useToaster from 'hooks/useToaster'

const Login = () => {
  const navigate = useNavigate()

  const { signIn } = useGlobal()
  const { showError } = useToaster()

  const s = useStyles(styles)
  const { t } = useTranslation(null, { keyPrefix: 'Auth.Login' })

  // -- Form
  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // -- Login action
  const onSubmit = async data => {
    try {
      await signIn(data.email, data.password)
      navigate('/')
    } catch (err) {
      if (err.message === 'Network Error') {
        return showError(t('ErrorConnection'))
      }
      if (err?.response?.status === 401) {
        return showError(t('ErrorCredentials'))
      }
      if (err?.response?.status === 500) {
        return showError(t('ErrorServer'))
      }
      return showError(t('ErrorUnknown'))
    }
  }

  return (
    <main className={s('layout login')}>
      <AuthNav register />
      <section className={s('form', 'card')}>
        <div className='card-header'>
          <h2>{t('HeadingSignIn')}</h2>
        </div>
        <div className='card-body'>
          <form className='form' onSubmit={handleSubmit(onSubmit)}>
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
            <div className='form-item controls'>
              <button className='btn primary'>{t('ButtonLogin')}</button>
            </div>
            <p className={s('link-swap', 'link')}>
              <Link to='/register'>{t('LinkRegister')}</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Login
