/** libs */
import React, {useState} from 'react';
import classNames from 'classnames';
import {RiUser3Line,RiMailLine,  RiLogoutCircleLine, RiAlarmWarningLine, RiMailSendLine, RiFolderLockLine} from 'react-icons/ri';
import {APP_ROUTES, FORM, EMAIL_REGEX, PASSWORD_REGEX} from '/utils/globals';
import {postSignUp} from '../../api/auth/auth.api';
import {Link} from 'react-router-dom';
import {useSpring, animated} from 'react-spring';
import Spinner from '../../components/spinner/spinner.component';
import Input from '/components/Input/Input.component';

/** styles */
import styles from './sign-up.module.scss';

/** constants */
/**@default */
const INITIAL_STATE_FORM = {
    /** @type {string} */
    businessName: '',
    /** @type {string} */
    email: '',
    /** @type {string} */
    confirmPassword: '',
    /** @type {string} */
    password: '',
  },
  INITIAL_STATE = {
    /** @type {boolean} */
    isLoading: false,
    /** @type {string} */
    error: null
  };

/** @component SignUp
 * @returns {React.ReactNode} - functional component
*/
const SignUp = () => {

  const [isFormSent, setIsFormSent] = useState(false);
  const [{isLoading, error}, setState] = useState({...INITIAL_STATE});
  const [form, setForm] = useState({...INITIAL_STATE_FORM});
  const [formErrors, setFormErrors] = useState({...INITIAL_STATE_FORM});
  const animatedProps = useSpring({opacity: isFormSent? 1: 0, transform: isFormSent? 'translateY(0)' : 'translateY(-20px)' });


  /**@function handleChange
   * event handler for input change
   * @param {Event} - syntatic event from react
  */
  function handleChange(event) {
    const {target: {name, value}} = event;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  }

  /**@function handleTryAgainClick
   * helper function to reset the form
  */
  function handleTryAgainClick() {
    setForm({...INITIAL_STATE_FORM});
    setIsFormSent(false);
  }

  /**@function submitForm
   * helper function to submit request
  */
  async function submitForm(){
    setState({
      isLoading: true,
      error: null,
    });
    try {
      await postSignUp(form, false);
      setIsFormSent(true);
      setState({
        isLoading: false,
        error: null,
      });
    } catch(e) {
      setIsFormSent(true);
      setState({
        isLoading: false,
        error: 'sad face :(',
      });
    }
  }
  
  /**@function handleSubmit
   * event handler for form submit
  */
  function handleSubmit(event){
    event.preventDefault();
    const nextFormErrors = {...INITIAL_STATE_FORM};
    let isValid = true;
    setFormErrors(nextFormErrors);

    if (!form.businessName) {
      nextFormErrors.businessName = 'Ingresa el nombre de negocio';
      isValid = false;
    } else if(form.businessName.length < FORM.MIN_BUSINESS_NAME_CHARACTERS) {
      nextFormErrors.businessName = `Al menos debe contener ${FORM.MIN_BUSINESS_NAME_CHARACTERS} caracteres`;
      isValid = false;
    }

    if (!form.email) {
      nextFormErrors.email = 'Ingresa el correo electrónico';
      isValid = false;
    } else if(!EMAIL_REGEX.test(form.email)){
      nextFormErrors.email = 'Email invalido';
      isValid = false;
    }
    
    if (!form.password) {
      nextFormErrors.password = 'Ingresa la contraseña';
      isValid = false;
    } else if(!PASSWORD_REGEX.test(form.password)) {
      nextFormErrors.password = 'La contraseña debe contener al menos una letra, un digito y al menos debe ser de 6 caracters';
      isValid = false;
    }

    if (!form.confirmPassword) {
      nextFormErrors.confirmPassword = 'Ingresa confirmar contraseña';
      isValid = false;
    } else if(form.confirmPassword !== form.password) {
      nextFormErrors.confirmPassword = 'Las contraseñas deben coincidir';
      isValid = false;
    }

    if(!isValid) {
      return setFormErrors(nextFormErrors);
    }
    submitForm();
  }

  return (
    <section className="page">
      <div className={styles['sign-up']}>
        <div className="container h-100">
          <div className="row h-100">
            <div className={classNames('d-flex justify-content-center flex-column h-100 align-items-center', styles.container)}>
              <div className={styles['adornment']} />
              <div className={styles['form-content']}>
                <div className="d-flex justify-content-center flex-column align-items-center">
                  {isLoading && <Spinner legend="Hold on a sec..."/>}
                  {!isLoading && isFormSent && !error && (
                    <>
                      <animated.span style={animatedProps} ><RiMailSendLine className={styles.icon}/></animated.span>
                      <p className="lead text-center"> Last step!, we only need a confirmation from your side</p>
                      <p className="text-center">If no message from us has arrive in 5 minuts or so, please press the button</p>
                      <button type="button" className="btn btn-outline-primary" onClick={handleTryAgainClick}>Try again <RiLogoutCircleLine/></button>
                    </>
                  )}
                  {!isLoading && isFormSent && error && (
                    <>
                      <animated.span style={animatedProps} ><RiAlarmWarningLine className={styles.icon}/></animated.span>
                      <p className="lead text-center">{error}</p>
                      <button type="button" className="btn btn-outline-primary" onClick={handleTryAgainClick}>Try again <FontAwesomeIcon icon={faHistory}/></button>
                    </>
                  )}
                </div>
                {!isLoading && !isFormSent && (
                  <>
                    <div className="mb-5">
                      <h2 className="display-5 text-center">Crear nueva cuenta</h2>
                      <p className="text-center">Gracias por confiar en nosotros
                        <br/>
                        para terminar el registro favor de llenar los siguientes datos
                      </p>
                    </div>
                    <form className="w-100" noValidate>
                      <Input 
                        icon={<RiMailLine/>}
                        data-test="signUpEmailInput"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className={classNames({
                          'form-control': true,
                          'is-invalid': Boolean(formErrors.email)
                        })}
                        name="email"
                        aria-label="Text input for email"
                        placeholder="Correo electrónico"
                        error={formErrors.email}
                      />
                      <Input 
                        icon={<RiUser3Line/>}
                        data-test="signUpBusinessNameInput"
                        type="text"
                        value={form.businessName}
                        onChange={handleChange}
                        className={classNames({
                          'form-control': true,
                          'is-invalid': Boolean(formErrors.businessName)
                        })}
                        name="businessName"
                        aria-label="Text input for email"
                        placeholder="Nombre del negocio"
                        error={formErrors.businessName}
                      />
                      <Input 
                        icon={<RiFolderLockLine/>}
                        data-test="signUpPasswordInput"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        className={classNames({
                          'form-control': true,
                          'is-invalid': Boolean(formErrors.password)
                        })}
                        name="password"
                        aria-label="Text input for email"
                        placeholder="Contraseña"
                        error={formErrors.password}
                      />
                       <Input 
                        icon={<RiFolderLockLine/>}
                        data-test="signUpConfirmPasswordInput"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={classNames({
                          'form-control': true,
                          'is-invalid': Boolean(formErrors.confirmPassword)
                        })}
                        name="confirmPassword"
                        aria-label="Text input for email"
                        placeholder="Confirmar contraseña"
                        error={formErrors.confirmPassword}
                      />
                      <button type="submit" className="btn btn-outline-primary btn-block" onClick={handleSubmit}>Registrarme</button>
                    </form>
                  </>
                )}
                <div className="d-flex justify-content-between flex-column text-center mt-5">
                  <div><small>Ya tengo una cuenta,&nbsp;<Link to={APP_ROUTES.SIGN_IN}>llevame al inicio</Link></small></div>
                  <div><small><Link to={APP_ROUTES.FORGOT_PASSWORD}>forgot your Password?</Link></small></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;