import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore"
import { useEffect } from "react"
import { db } from "../db/firebase"

export default function DashboardPage() {
  useEffect(() => {
    console.log('>> useEffect')
    getDocs(collection(db, 'investmentEvolutions')).then((docs) => {
      docs.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
  }, [])

  const addElemen = () => {
    console.log('>> addElemen')
    addDoc(collection(db, 'caja'), {
      name: 'test',
      amount: 1000,
      date: new Date()
    }).then((doc) => {
      console.log('>> doc was added', doc)
    }).catch((error) => {
      console.log('>> error', error)
    })
  }

  const getElement = () => {
    console.log('>> getElement')
    const docRef = doc(db, 'investmentEvolutions/user1');
    getDoc(docRef).then((doc) => {
      console.log('>> doc', doc.data())
    })
  }

  return (
    <div>
      <h1>Dashboard</h1>
        <div>
          todo ok
        </div>
        <div>
          <button onClick={addElemen}>Add</button>
        </div>
        <div>
          <button onClick={getElement}>Get</button>
        </div>
      {/* )} */}
    </div>
  )
}