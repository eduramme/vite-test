import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsThreeDotsVertical, BsFillPencilFill, BsXLg } from "react-icons/bs";
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';

export interface User {
  id: number
  email: string
  name: string
  phone: string
  username: string
  website: string
  company: Company
}

export interface Company {
  bs: string
  catchPhrase: string
  name: string
}

export interface Address {
  city: string
  street: string
  suite: string
  zipcode: string
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

function App() {
  const [ users, setUsers ] = useState<Array<User>>( [] )
  const [ isUserHidden, setIsUserHidden ] = useState<boolean>( false )
  const [ isEmailHidden, setIsEmailHidden ] = useState<boolean>( false )
  const [ isCompanyNameHidden, setIsCompanyNameHidden ] = useState<boolean>( false )
  const [ isUsernameHidden, setIsUsernameHidden ] = useState<boolean>( false )

  useEffect( () => {
    fetch( 'https://jsonplaceholder.typicode.com/users' )
      .then( ( response ) => response.json() )
      .then( ( json: Array<User> ) => setUsers( json ) );
  }, [] )

  console.log( users )

  const Menu = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={ BsThreeDotsVertical } id="dropdown-custom-components" style={ {
          backgroundColor: "white",
          cursor: 'pointer',
        } }>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item >Colunas</Dropdown.Item>
          <Dropdown.Item >
            <div onClick={ () => { setIsUserHidden( !isUserHidden ) } }>
              <input type="checkbox" checked={ !isUserHidden } value="Paneer" />
              { " " }Usuário
            </div>
          </Dropdown.Item>
          <Dropdown.Item >
            <div onClick={ () => { setIsCompanyNameHidden( !isCompanyNameHidden ) } }>
              <input type="checkbox" checked={ !isCompanyNameHidden } value="Cliente" />
              { " " }Cliente
            </div>
          </Dropdown.Item>
          <Dropdown.Item >
            <div onClick={ () => { setIsEmailHidden( !isEmailHidden ) } }>
              <input type="checkbox" checked={ !isEmailHidden } value="Email" />
              { " " }E-mail
            </div>
          </Dropdown.Item>
          <Dropdown.Item >
            <div onClick={ () => { setIsUsernameHidden( !isUsernameHidden ) } }>
              <input type="checkbox" checked={ !isUsernameHidden } value="Perfil" />
              { " " }Perfil de acesso
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <div className="App">
      <Table className='table' striped hover>
        <thead>
          <tr>
            { !isUserHidden && <th>USUÁRIO</th> }
            { !isEmailHidden && <th>Email</th> }
            { !isCompanyNameHidden && <th>Cliente</th> }
            { !isUsernameHidden && <th>Perfil de Acesso</th> }
            <th style={ { width: '10%', textAlign: 'right', paddingRight: '20px' } }>
              <Menu />
            </th>
          </tr>
        </thead>
        <tbody>
          {
            !!users ? users?.map( ( user: any ): any => {
              return (
                <tr>
                  { !isUserHidden && <td>{ user?.name }</td> }
                  { !isEmailHidden && <td>{ user?.email }</td> }
                  { !isCompanyNameHidden && <td>{ user?.company.name }</td> }
                  { !isUsernameHidden && <td >
                    { user?.username }
                  </td> }
                  <td style={ { flexDirection: 'row', display: 'flex', justifyContent: "flex-start" } }>
                    <div style={ { marginLeft: '30px' } }>
                      <BsFillPencilFill color='blue' />
                    </div>
                    <div style={ { marginLeft: '50px' } }>
                      <BsXLg color='red' />
                    </div>
                  </td>
                </tr>
              )
            } ) :
              <tr>
                <td colSpan={ 5 } style={ { textAlign: 'center' } }>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </td>
              </tr>
          }
        </tbody>
      </Table>
    </div >
  )
}

export default App
