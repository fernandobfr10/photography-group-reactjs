import { useState } from 'react';
import './App.css'

import Logo from './assets/images/photography-group.png'

function App() {

  const [images, setImages] = useState([])

  const dragEvents = {
    onDragEnter: event => event.preventDefault(),
    onDragLeave: event => event.preventDefault(),
    onDragOver: event => event.preventDefault(),
    onDrop: event => {
      event.preventDefault()
      
      const files = Array.from(event.dataTransfer.files)

      // Utilizando o FileReader
      files.map(file => {
        const { name, size } = file
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onloadend = () => {
          const preview = reader.result
          const image = { name, size, preview }

          setImages(prevImages => [...prevImages, image])
        }
        return null
      })  
      // Utilizando o URL.createObjectURL - Menos performático que o File Reader

      // const images = files.map(file => {
      //   const { name, size } = file
      //   return { name, size, preview: URL.createObjectURL(file) }
      // })

      // setImages(images)
    },
  }

  return (
    <div className="container">
      <div className="logo">
        <img src={Logo} alt="Logo Photography Group" />
      </div>

      <div className="file-drop" { ...dragEvents }>
        <div className="text">Arraste as imagens para cá!</div>
      </div>

      <div className="preview">
        { images.map((image, index) => {
          return (
            <div className="image" key={index}>
              <img src={image.preview} alt={image.name} />
            </div>
          )
        })}
      </div>

    </div>
  );
}

export default App;
