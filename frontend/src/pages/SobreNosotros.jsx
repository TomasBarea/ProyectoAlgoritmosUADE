import React from 'react'
import Navbar from '../components/navbar'

const SobreNosotros = () => {
    return (
        <>  

            <Navbar />
            <section class="sobrenos">
                <div class="container">
                    <h2>Sobre Nosotros</h2>


                    <div class="card">
                        <h3>Misión</h3>
                        <p>Nuestra misión es...</p>
                    </div>


                    <div class="card">
                        <h3>Visión</h3>
                        <p>Nuestra visión es...</p>
                    </div>


                    <div class="card">
                        <h3>Valores</h3>
                        <p>Nuestros valores ...</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SobreNosotros