"use client";

import { useEffect, useRef, useState } from "react";

const fotos = [

  {

    src: "/fotos/foto1.jpg",

    texto:

      "Si pudiera volver al principio de nuestra historia, volvería a elegir conocerte, porque sin imaginarlo, terminaste convirtiéndote en alguien demasiado especial para mí.",

  },

  {

    src: "/fotos/foto2.jpg",

    texto:

      "Me encanta que contigo pueda reírme por cualquier tontería, hacer locuras y disfrutar de esos momentos sencillos que, cuando estoy a tu lado, se vuelven inolvidables.",

  },

  {

    src: "/fotos/foto3.jpg",

    texto:

      "Entre tantas personas y tantos caminos, qué bonito que nuestros mundos se encontraran y que hoy podamos construir una historia que solo tú y yo sabemos cómo se siente.",

  },

  {

    src: "/fotos/foto4.jpg",

    texto:

      "No necesito que todos mis días sean perfectos; muchas veces me basta con tenerte cerca, sentir tu cariño y compartir contigo hasta aquello que no sé explicar.",

  },

  {

    src: "/fotos/foto5.jpg",

    texto:

      "Han pasado siete meses desde que comenzamos este camino, y todavía me emociona pensar en todo lo que hemos vivido, aprendido y descubierto mientras nos elegimos cada día.",

  },

  {

    src: "/fotos/foto6.jpg",

    texto:

      "Estas fotos guardan pedacitos de lo que somos hoy, pero mi parte favorita es saber que nuestra historia sigue escribiéndose y que todavía nos quedan muchos recuerdos por crear.",

  },

];

const secretos = [

  "Si pudiera volver al día en que te conocí, volvería a elegir conocerte.",

  "Tal vez no siempre sepa expresar lo que siento, pero te amo mucho más de lo que consigo decir.",

  "Gracias por cuidarme, escucharme y hacerme sentir acompañada.",

  "Mi lugar favorito no siempre es un lugar; muchas veces eres tú.",

  "Este pequeño universo lo hice pensando en ti. Espero que puedas sentir todo el amor que puse en él.",

];

const titulosSecretos = [

  "Una confesión para ti",

  "Algo que amo de nosotros",

  "Una promesa pequeñita",

  "Algo que quiero que recuerdes",

  "Mi último secreto",

];

const textoCarta = `Para mi persona favorita ♡

No sé si existen las palabras perfectas para explicar todo lo que siento por ti, pero quería hacer algo diferente, algo que llevara un poquito de mí y de todo el amor que te tengo.

A veces me cuesta expresar lo que pasa por mi corazón. Hay cosas que siento muy fuerte y que no siempre sé cómo decir. Pero quiero que sepas que me hace feliz compartir mis días contigo, reírme contigo, aprender a tu lado y descubrir todas esas pequeñas cosas que hacen especial lo nuestro.

Gracias por llegar a mi vida, por tu cariño y por permitirme construir contigo algo que quiero cuidar cada día. No somos perfectos, pero lo bonito es que podemos seguir aprendiendo juntos.

Esta página es pequeñita, pero cada detalle está hecho pensando en ti. Ojalá, cuando la visites, recuerdes que hay alguien que te quiere muchísimo y que se alegra de tenerte en su vida.

Con todo mi amor,

Tu niña ❤️`;

type FaseCarta = "sobre" | "saliendo" | "escribiendo" | "completa";

export default function Home() {

  const [fase, setFase] = useState<FaseCarta>("sobre");

  const [letrasVisibles, setLetrasVisibles] = useState(0);

  const [fotoActiva, setFotoActiva] = useState<number | null>(null);

  const [secretosAbiertos, setSecretosAbiertos] = useState<number[]>([]);

  const [intentos, setIntentos] = useState([0, 0, 0, 0, 0]);

  const [relojAbierto, setRelojAbierto] = useState(false);

  const [cartaFinalAbierta, setCartaFinalAbierta] = useState(false);

  const [manteniendo, setManteniendo] = useState<number | null>(null);

  const temporizadorRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {

    if (fase !== "escribiendo") return;

    if (letrasVisibles >= textoCarta.length) {

      setFase("completa");

      return;

    }

    const temporizador = window.setTimeout(() => {

      setLetrasVisibles((actual) => actual + 1);

    }, 32);

    return () => window.clearTimeout(temporizador);

  }, [fase, letrasVisibles]);

  useEffect(() => {

    return () => {

      if (temporizadorRef.current) {

        clearTimeout(temporizadorRef.current);

      }

    };

  }, []);

  function abrirCarta() {

    setLetrasVisibles(0);

    setFase("saliendo");

  }

  function cerrarCarta() {

    setLetrasVisibles(0);

    setFase("sobre");

  }

  function cambiarFoto(direccion: number) {

    setFotoActiva((actual) => {

      if (actual === null) return 0;

      return (actual + direccion + fotos.length) % fotos.length;

    });

  }

  function revelarSecreto(index: number) {

    setSecretosAbiertos((actuales) =>

      actuales.includes(index) ? actuales : [...actuales, index]

    );

  }

  function contarToque(index: number, objetivo: number) {

    if (secretosAbiertos.includes(index)) return;

    const siguiente = [...intentos];

    siguiente[index] += 1;

    setIntentos(siguiente);

    if (siguiente[index] >= objetivo) {

      revelarSecreto(index);

    }

  }

  function comenzarPresion(index: number, duracion: number) {

    if (secretosAbiertos.includes(index)) return;

    if (temporizadorRef.current) {

      clearTimeout(temporizadorRef.current);

    }

    setManteniendo(index);

    temporizadorRef.current = setTimeout(() => {

      revelarSecreto(index);

      setManteniendo(null);

      temporizadorRef.current = null;

    }, duracion);

  }

  function terminarPresion() {

    if (temporizadorRef.current) {

      clearTimeout(temporizadorRef.current);

      temporizadorRef.current = null;

    }

    setManteniendo(null);

  }

  const parrafosVisibles = textoCarta.slice(0, letrasVisibles).split("\n\n");

  return (

    <main className="pagina">

      <div className="contenido">

        <p className="etiqueta">✦ FELICES 7 MESES, MI AMOR ✦</p>

        <h1>Nuestros 7 meses</h1>

        <p className="subtitulo">

          Siete meses de nosotros, de recuerdos y de un amor que sigue

          creciendo... ♡

        </p>

        <p className="frase-misteriosa">

          «En algún rincón del tiempo, dos mundos encontraron la forma de

          convertirse en uno».

        </p>

        <section className="escena-carta">

          {fase === "sobre" && (

            <div className="inicio-carta">

              <button

                className="sobre sobre-animado"

                onClick={abrirCarta}

                aria-label="Abrir la carta de amor"

              >

                <span className="papel-dentro">💌</span>

                <span className="cuerpo-sobre" />

                <span className="solapa" />

                <span className="sello">♥</span>

                <span className="texto-sobre">Para ti</span>

              </button>

              <button className="boton" onClick={abrirCarta}>

                Abrir mi cartita <span>♡</span>

              </button>

            </div>

          )}

          {fase === "saliendo" && (

            <div className="sobre-salida">

              <div className="sobre sobre-animado sobre-fondo">

                <span className="cuerpo-sobre" />

                <span className="solapa" />

                <span className="sello">♥</span>

              </div>

              <div

                className="papel-saliendo"

                onAnimationEnd={() => {

                  setLetrasVisibles(0);

                  setFase("escribiendo");

                }}

                aria-hidden="true"

              >

                <span>♥</span>

              </div>

            </div>

          )}

          {(fase === "escribiendo" || fase === "completa") && (

            <section className="carta carta-lectura">

              <div className="texto-escrito" aria-live="polite">

                {parrafosVisibles.map((parrafo, index) => (

                  <p

                    className={

                      index === 0

                        ? "saludo"

                        : index === 5

                          ? "firma"

                          : ""

                    }

                    key={index}

                  >

                    {parrafo}

                  </p>

                ))}

              </div>

              {fase === "completa" && (

                <button

                  className="boton boton-secundario"

                  onClick={cerrarCarta}

                >

                  Volver al sobre ♥

                </button>

              )}

            </section>

          )}

        </section>

        <section className="reloj-sombrerero">

          <p className="etiqueta">✦ UN INSTANTE FUERA DEL TIEMPO ✦</p>

          <button

            className="reloj-magico"

            onClick={() => setRelojAbierto(!relojAbierto)}

            aria-expanded={relojAbierto}

          >

            <span className="reloj-aro">✦</span>

            <span className="reloj-emoji">🕰️</span>

            <span className="reloj-indicacion">

              {relojAbierto ? "Cerrar el recuerdo" : "Toca el reloj"}

            </span>

          </button>

          {relojAbierto && (

            <p className="mensaje-reloj">

              «El tiempo vuela cuando estoy contigo… pero si pudiera detenerlo,

              elegiría quedarme un ratito más en cada momento a tu lado».&#x20;

            </p>

          )}

        </section>

        <section className="seccion-recuerdos">

          <p className="etiqueta">NUESTROS MOMENTOS</p>

          <h2>Pedacitos de nosotros</h2>

          <p className="texto-seccion">

            Cada fotografía guarda algo que mi corazón no quiere olvidar.

            Toca una foto para revivir ese recuerdo. ✨

          </p>

          <div className="galeria">

            {fotos.map((foto, index) => (

              <button

                className="marco-foto"

                key={foto.src}

                onClick={() => setFotoActiva(index)}

                aria-label={`Ver recuerdo ${index + 1}`}

              >

                <img src={`/timekeeper${foto.src}`} alt={`Recuerdo de los dos ${index + 1}`} />

                <span>♡</span>

              </button>

            ))}

          </div>

        </section>

        <section className="seccion-secretos">

          <p className="etiqueta">✦ UN RINCÓN SOLO NUESTRO ✦</p>

          <h2>Secretos del corazón ♡</h2>

          <p className="texto-seccion">

            Cada corazón guarda algo que quiero decirte. Cumple el pequeño reto

            de cada uno para descubrir lo que escondí dentro. 💌

          </p>

          <div className="progreso-secretos">

            <span className="progreso-icono">♡</span>

            <div className="progreso-texto">

              <strong>

                {secretosAbiertos.length} de {secretos.length} secretos

                descubiertos

              </strong>

              <div className="barra-progreso">

                <div

                  className="barra-progreso-llena"

                  style={{

                    width: `${(secretosAbiertos.length / secretos.length) * 100}%`,

                  }}

                />

              </div>

            </div>

            <span className="progreso-icono">♥</span>

          </div>

          <div className="lista-secretos">

            {secretos.map((secreto, index) => {

              const revelado = secretosAbiertos.includes(index);

              const toqueMultiple = index === 0 || index === 2 || index === 4;

              const objetivo = index === 2 ? 5 : 3;

              return (

                <div

                  className={`secreto-corazon-card ${revelado ? "revelado" : ""}`}

                  key={index}

                >

                  <span className="corazon-decorativo" aria-hidden="true">

                    {revelado ? "♥" : "♡"}

                  </span>

                  <span className="secreto-numero">

                    SECRETO {String(index + 1).padStart(2, "0")}

                  </span>

                  <h3>

                    {revelado ? "Un pedacito de mi corazón" : titulosSecretos[index]}

                  </h3>

                  {revelado ? (

                    <p className="mensaje-dentro-corazon">{secreto}</p>

                  ) : (

                    <>

                      <p className="reto-secreto">

                        {index === 0 || index === 4

                          ? "Toca el corazón 3 veces"

                          : index === 1

                            ? "Mantén presionado 1 segundo"

                            : index === 2

                              ? "Toca el corazón 5 veces"

                              : "Mantén presionado 2 segundos"}

                      </p>

                      {toqueMultiple ? (

                        <button

                          className="boton-corazon"

                          onClick={() => contarToque(index, objetivo)}

                          aria-label={`Tocar el corazón ${objetivo} veces para descubrir el secreto ${index + 1}`}

                        >

                          ♥

                        </button>

                      ) : (

                        <button

                          className={`boton-corazon ${manteniendo === index ? "presionando" : ""}`}

                          onPointerDown={() =>

                            comenzarPresion(index, index === 1 ? 1200 : 2000)

                          }

                          onPointerUp={terminarPresion}

                          onPointerLeave={terminarPresion}

                          onPointerCancel={terminarPresion}

                          onContextMenu={(event) => event.preventDefault()}

                          aria-label={`Mantener presionado para descubrir el secreto ${index + 1}`}

                        >

                          ♥

                        </button>

                      )}

                      {toqueMultiple && (

                        <p className="contador-reto">

                          {intentos[index]} / {objetivo} toques

                        </p>

                      )}

                    </>

                  )}

                </div>

              );

            })}

          </div>

          {secretosAbiertos.length === secretos.length && (

            <>

              <div className="sorpresa-final">

                <span className="sorpresa-estrellas">✦ ✧ ♥ ✧ ✦</span>

                <h3>¡Descubriste todos mis secretos!</h3>

                <p>

                  Y aun después de contarte estas cinco cositas, todavía me

                  quedan muchísimas razones para amarte. Felices siete meses,

                  mi Sombrerero.&#x20;

                </p>

                <span className="sorpresa-firma">Con amor, tu Alicia ♡</span>

              </div>

              <section className="carta-final-secreta">

                {!cartaFinalAbierta ? (

                  <button

                    className="sobre-final"

                    onClick={() => setCartaFinalAbierta(true)}

                  >

                    <span className="sello-final">♥</span>

                    <span>Una última sorpresa para ti</span>

                    <small>De tu Alicia, para su Sombrerero</small>

                    <span className="abrir-final">Abrir mi última carta ✧</span>

                  </button>

                ) : (

                  <article className="papel-final">

                    <p className="etiqueta">PARA MI SOMBRERERO</p>

                    <h3>Y esto todavía no es el final…</h3>

                    <p>

                      Si tuviera que volver a recorrer todo el camino para

                      encontrarte, lo haría. Porque entre tantas vueltas

                      inesperadas, tú terminaste siendo una de mis partes

                      favoritas de la historia.

                    </p>

                    <p>

                      Gracias por estos siete meses, por los recuerdos que ya

                      guardamos y por todos los que todavía nos esperan. No sé

                      qué páginas nos quedan por escribir, pero sí sé con quién

                      quiero seguir descubriéndolas.

                    </p>

                    <p className="firma-final">Con amor, tu Alicia ♡</p>

                  </article>

                )}

              </section>

            </>

          )}

        </section>

        <p className="pie">

          Hecho con amor, especialmente para ti <span>♥</span>

        </p>

      </div>

      {fotoActiva !== null && (

        <div

          className="visor"

          onClick={() => setFotoActiva(null)}

          role="presentation"

        >

          <div

            className="visor-contenido"

            role="dialog"

            aria-modal="true"

            aria-label="Fotografía de un recuerdo"

            onClick={(event) => event.stopPropagation()}

          >

            <button

              className="cerrar-visor"

              onClick={() => setFotoActiva(null)}

              aria-label="Cerrar fotografía"

            >

              ×

            </button>

            <div className="foto-animada" key={fotoActiva}>

              <img

                src={`/timekeeper${fotos[fotoActiva].src}`}

                alt={`Recuerdo ${fotoActiva + 1} de los dos`}

              />

              <span className="destello destello-uno">✦</span>

              <span className="destello destello-dos">✧</span>

              <span className="corazon-flotante">♥</span>

            </div>

            <p className="frase-recuerdo" key={`frase-${fotoActiva}`}>

              {fotos[fotoActiva].texto}

            </p>

            <div className="indicador-foto">

              {fotos.map((foto, index) => (

                <button

                  key={foto.src}

                  className={`punto-foto ${fotoActiva === index ? "activo" : ""}`}

                  onClick={() => setFotoActiva(index)}

                  aria-label={`Ir al recuerdo ${index + 1}`}

                />

              ))}

            </div>

            <div className="controles-foto">

              <button className="boton" onClick={() => cambiarFoto(-1)}>

                ← Anterior

              </button>

              <span className="contador-foto">

                {fotoActiva + 1} / {fotos.length}

              </span>

              <button className="boton" onClick={() => cambiarFoto(1)}>

                Siguiente →

              </button>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}
