import React, { useState, useEffect } from 'react'
function OrderPage () {
  const [inputList, setInputList] = useState([
    { itemname: '', Quantity: '', PriceUnit: '', totalPrice: '' }
  ])
  const [id, setId] = useState(0)

  const [Submitdata, setSubmitdata] = useState([])
  const [orderNumber, setorderNumber] = useState(1)
  const [purchaseDate, setpurchaseDate] = useState('')
  const [CustomerName, setCustomerName] = useState('')
  const [totalAmount, settotalAmount] = useState('')
  const [retrievedObject, setRetrievedObjet] = useState([])
  const [itemList, setitemList] = useState([])
  const [orderId, setOrderID] = useState('')

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]

    list[index][name] = value
    setInputList(list)
  }
  useEffect(() => {
    inserLocalStorage(Submitdata)
  }, [Submitdata])

  const inserLocalStorage = data => {
    if (data.length != 0) {
      localStorage.setItem('users', JSON.stringify(data))
      setInputList([
        { itemname: '', Quantity: '', PriceUnit: '', totalPrice: '' }
      ])
      setpurchaseDate('')
      setCustomerName('')
      settotalAmount('')
      setRetrievedObjet(localStorage.getItem('users'))
    }
  }
  const handleRemoveClick = index => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { itemname: '', Quantity: '', PriceUnit: '', totalPrice: '' }
    ])
  }
  const handleSave = () => {
    var newObjetc = {
      id: id,
      orderNumber: orderNumber,
      purchaseDate: purchaseDate,
      CustomerName: CustomerName,
      totalAmount: totalAmount,
      items: [...inputList]
    }
    setSubmitdata([...Submitdata, newObjetc])

    setId(id + 1)
    setorderNumber(orderNumber + 1)
  }

  const handleTableClick = key => {
    var result = JSON.parse(retrievedObject).filter(data => data.id === key)
    setitemList(result[0].items)
    setOrderID(result[0].orderNumber)
  }
  const OrderDetails = (
    <div>
      <div
        style={{
          display: 'flex',
          width: '600px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <lable style={{ fontWeight: 'bold' }}>Order No</lable>
          <input
            type='number'
            value={orderNumber}
            onChange={e => setorderNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <lable style={{ fontWeight: 'bold' }}>Purchase Date</lable>
          <input
            type='date'
            value={purchaseDate}
            onChange={e => setpurchaseDate(e.target.value)}
            required
          />
        </div>
        <div>
          <lable style={{ fontWeight: 'bold' }}>Customer Name</lable>
          <input
            type='text'
            value={CustomerName}
            onChange={e => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <lable style={{ fontWeight: 'bold' }}>Total Amount</lable>
          <input
            type='number'
            value={totalAmount}
            onChange={e => settotalAmount(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  )
  const userTable = (
    <table>
      <tr>
        <th>Order No</th>
        <th>Customer Name</th>
        <th>Purchase Date</th>
        <th>Total Amount</th>
      </tr>
      <tbody>
        {retrievedObject.length > 0 &&
          JSON.parse(retrievedObject).map((user, index) => (
            <tr key={user.id} onClick={() => handleTableClick(user.id)}>
              <td>{user.orderNumber}</td>
              <td>{user.CustomerName}</td>
              <td>{user.purchaseDate}</td>
              <td>{user.totalAmount}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )

  const ItemsTable = (
    <table>
      <tr>
        <th>Item Name</th>
        <th>Item Quantity</th>
        <th>Item Price</th>
        <th>Order No</th>
      </tr>
      <tbody>
        {itemList.length > 0 &&
          itemList.map((order, index) => (
            <tr>
              <td>{order.itemname}</td>
              <td>{order.Quantity}</td>
              <td>{order.PriceUnit}</td>
              <td>{orderId}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )

  return (
    <div className='App'>
      <h1>ORDER PAGE</h1>
      <div>{OrderDetails}</div>
      <br />
      <div>
        {inputList.map((x, i) => {
          return (
            <div style={{ display: 'flex' }}>
              <div className='eachItem'>
                <label>Enter itemname</label>
                <input
                  name='itemname'
                  type='text'
                  value={x.itemname}
                  onChange={e => handleInputChange(e, i)}
                />
              </div>
              <div className='eachItem'>
                <label>Enter Quantity</label>

                <input
                  name='Quantity'
                  value={x.Quantity}
                  type='number'
                  onChange={e => handleInputChange(e, i)}
                />
              </div>
              <div className='eachItem'>
                <label>Enter PriceUnit</label>

                <input
                  name='PriceUnit'
                  value={x.PriceUnit}
                  type='number'
                  onChange={e => handleInputChange(e, i)}
                />
              </div>
              <div className='eachItem'>
                <label>Enter totalPrice</label>

                <input
                  name='totalPrice'
                  value={x.totalPrice}
                  type='number'
                  onChange={e => handleInputChange(e, i)}
                />
              </div>
              <div style={{ marginTop: '22px' }}>
                {inputList.length !== 1 && (
                  <button
                    onClick={() => handleRemoveClick(i)}
                    style={{
                      color: 'white',
                      backgroundColor: '#EA462F',
                      fontWeight: 'bold',
                      padding: '8px 16px',
                      borderRadius: '15px',
                      fontSize: '12px'
                    }}
                  >
                    Remove
                  </button>
                )}
                {inputList.length - 1 === i && (
                  <button
                    onClick={handleAddClick}
                    style={{
                      color: 'white',
                      backgroundColor: 'blue',
                      fontWeight: 'bold',
                      padding: '8px 20px',
                      borderRadius: '15px',
                      fontSize: '12px'
                    }}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <br />
      <button
        onClick={handleSave}
        submit
        style={{
          color: 'white',
          backgroundColor: '#14bc14',
          fontWeight: 'bold',
          padding: '8px 44px',
          borderRadius: '15px',
          fontSize: '14px'
        }}
      >
        Save
      </button>
      <div style={{ marginTop: '20px' }}>
        <>{Submitdata.length > 0 && userTable}</>
      </div>
      <br />
      <div>
        <>{itemList.length > 0 && ItemsTable}</>
      </div>
    </div>
  )
}

export default OrderPage
