import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import CountUp from "react-countup";

// DADOS DOS CARROS
const cars = [
  {
    id: 1,
    name: "Lamborghini Revuelto",
    price: "R$ 4.800.000",
    speed: 2.5,
    power: 1015,
    images: [
      "lamborgini.jpeg",
      "lamborghini1.jpeg",
    ],
    description:
      "O Lamborghini Revuelto é um supercarro híbrido V12 com 1015 cv. Combina eletrificação com a tradição extrema da Lamborghini, entregando aceleração brutal e design futurista.",
  },
  {
    id: 2,
    name: "Porsche 911 GT3 RS",
    price: "R$ 3.900.000",
    speed: 3.0,
    power: 525,
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600",
    description:
      "O Porsche 911 GT3 RS é uma máquina de pista homologada para rua. Possui aerodinâmica ativa, downforce extremo e precisão alemã incomparável.",
  },
  {
    id: 3,
    name: "Ferrari SF90",
    price: "R$ 5.200.000",
    speed: 2.4,
    power: 1000,
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1600",
    description:
      "A Ferrari SF90 é um plug-in hybrid com 1000 cv inspirado na Fórmula 1. Tecnologia avançada, luxo italiano e desempenho extremo em um único pacote.",
  },
  {
    id: 4,
    name: "Ferrari SF90 Assetto Fiorano",
    price: "R$ 5.500.000",
    speed: 2.4,
    power: 1000,
    images: [
      "ferrrari.jpeg",
      "ferrari2.jpeg",
    ],
    description:
      "Versão mais radical da SF90, com foco total em performance de pista, suspensão aprimorada e redução de peso para máxima agressividade.",
  },
  {
    id: 5,
    name: "mcLaren Artura",
    price: "R$ 4.500.000",
    speed: 2.4,
    power: 1000,
    images: [
      "mclaren.png",
      "mclaren2.png",
    ],
    description:
      "Versão mais radical da mcLaren Artura, com foco total em performance de pista, suspensão aprimorada e redução de peso para máxima agressividade.",
  },
  {
    id: 6,
    name: "Tesla Roadster",
    price: "R$ 6.000.000",
    speed: 2.4,
    power: 1000,
    images: [
      "tesla.png",
      "tesla2.jpeg",
    ],
    description:
      "O Tesla Roadster promete ser o carro elétrico mais rápido do mundo. Aceleração instantânea, autonomia elevada e tecnologia 100% elétrica de ponta.",
  },
  {
    id: 7,
    name: "Bugatti Chiron",
    price: "R$ 6.200.000",
    speed: 3.0,
    power: 2000,
    images: [
      "bugatti.png",
      "bugatti2.png",
    ],
    description:
      "O Bugatti Chiron é um hypercar com motor quad-turbo W16. Luxo extremo combinado com potência absurda e velocidade máxima acima dos 400 km/h.",
  },
  {
    id: 8,
    name: "Porsche 911 TURBO",
    price: "R$ 1.800.000",
    speed: 1.0,
    power: 1000,
    images: [
      "porche911.jpeg",
      "porche2.png",
    ],
    description:
      "O Porsche 911 TURBO é um supercarro com motor V8 twin-turbo. Potência extremamente alta, design clássico e tecnologia de ponta para desempenho de pista.",
  },
];
// MÚSICA DE FUNDO
function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.6;

    const start = () => {
      audio.play().catch(() => { });
      window.removeEventListener("click", start);
    };

    window.addEventListener("click", start);

    return () => {
      window.removeEventListener("click", start);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/music.mp3"
      preload="auto"
    />
  );
}
// CARROSSEL DE IMAGENS
function Carrosel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cars.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {cars.map((car, index) => (
        <motion.img
          key={car.id}
          src={car.images ? car.images[0] : car.image}
          alt={car.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute w-full h-full object-cover"
        />
      ))}
    </div>
  );
}
// Navegação fixa
function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10 px-12 py-5 flex justify-between text-white">
      <h1 className="text-2xl tracking-widest font-bold text-yellow-400">
        VORTEX ELITE
      </h1>

      <div className="space-x-10 hidden md:block">
        <a href="#collection" className="hover:text-yellow-400 transition">
          Collection
        </a>
        <a href="#performance" className="hover:text-yellow-400 transition">
          Performance
        </a>
        <a href="#contact" className="hover:text-yellow-400 transition">
          Contact
        </a>
      </div>
    </nav>
  );
}
// SEÇÃO HERO COM EFEITO DE SCROLL E SOM DE MOTOR
function Hero() {
  const ref = useRef(null);
  const engineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    engineRef.current = new Audio("hiphop.mp3");
    engineRef.current.volume = 0.7;
    engineRef.current.play().catch(() => { });
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="h-screen relative flex items-center justify-center text-center overflow-hidden bg-black"
    >
      <motion.div style={{ y }} className="absolute inset-0 opacity-50">
        <Carrosel />
      </motion.div>

      <div className="relative z-10 text-white max-w-4xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-6xl md:text-8xl font-bold leading-tight"
        >
          DRIVE THE FUTURE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-gray-300 text-lg"
        >
          Performance extrema. Luxo absoluto. Tecnologia incomparável.
        </motion.p>

        <motion.a
          href="#collection"
          whileHover={{ scale: 1.05 }}
          className="inline-block mt-10 bg-yellow-400 text-black px-10 py-4 rounded-full font-semibold tracking-wide"
        >
          Explore Collection
        </motion.a>
      </div>
    </section>
  );
}
// SEÇÃO DE COLEÇÃO COM MODAL DE DESCRIÇÃO E VALORES DE PAGAMENTO

function Collection() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [imgIndex, setImgIndex] = useState(0); // controla qual imagem mostrar

  const parsePrice = (price) => {
    return Number(price.replace("R$ ", "").replace(/\./g, "").replace(",", "."));
  };

  const formatCurrency = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <section
      id="collection"
      className="bg-gradient-to-b from-black to-zinc-950 text-white py-28 px-12"
    >
      <h2 className="text-center text-5xl font-bold mb-20 text-yellow-400">
        Elite Collection
      </h2>

      <div className="grid md:grid-cols-3 gap-12">
        {cars.map((car) => {
          const basePrice = parsePrice(car.price);
          const valorAvista = basePrice * 0.9;
          const valorFinanciado = basePrice * 1.3;

          return (
            <div
              key={car.id}
              onClick={() => {
                setSelectedCar(car);
                setImgIndex(0); // sempre começar pela primeira imagem
              }}
              className="cursor-pointer bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition"
            >
              <img
                src={car.images ? car.images[0] : car.image}
                alt={car.name}
                className="w-full h-80 object-cover rounded-2xl mb-8"
              />

              <div className="p-8">
                <h3 className="text-2xl font-bold">{car.name}</h3>
                <p className="text-gray-400 mt-2">0-100 km/h: {car.speed}s</p>
                <p className="text-yellow-400 text-xl font-semibold mt-3">{car.price}</p>

                <div className="mt-4 text-gray-300 text-sm space-y-1">
                  <p>À Vista (10% desconto): <span className="text-green-400">{formatCurrency(valorAvista)}</span></p>
                  <p>Financiado (30% juros): <span className="text-red-400">{formatCurrency(valorFinanciado)}</span></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCar && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-zinc-900 rounded-3xl max-w-3xl w-full p-10 relative">

            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-5 right-6 text-white text-2xl"
            >
              ✕
            </button>

            <img
              src={selectedCar.images ? selectedCar.images[imgIndex] : selectedCar.image}
              alt={selectedCar.name}
              className="w-full h-80 object-cover rounded-2xl mb-4"
            />

            {selectedCar.images && selectedCar.images.length > 1 && (
              <div className="flex gap-2 mb-6">
                {selectedCar.images.map((img, i) => (
                  <button
                    key={i}
                    className={`w-12 h-12 border rounded ${imgIndex === i ? "border-yellow-400" : "border-white/30"}`}
                    style={{
                      backgroundImage: `url(${img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => setImgIndex(i)}
                  />
                ))}
              </div>
            )}

            <h3 className="text-4xl font-bold text-yellow-400 mb-4">{selectedCar.name}</h3>
            <p className="text-gray-300 mb-6">{selectedCar.description}</p>

            <div className="grid grid-cols-2 gap-6 text-lg">
              <p><strong>Potência:</strong> {selectedCar.power} cv</p>
              <p><strong>0-100:</strong> {selectedCar.speed}s</p>
              <p><strong>Preço:</strong> {selectedCar.price}</p>
              <p><strong>Financiado (30% juros):</strong> {(parsePrice(selectedCar.price) * 1.3).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    if (!isLogin && !name) {
      alert("Digite seu nome");
      return;
    }

    // Salva no localStorage
    const userData = { name, email, password };
    localStorage.setItem("vortexUser", JSON.stringify(userData));

    onLogin(userData);
  };

  return (
    <section className="bg-black text-white py-28 px-6">
      <div className="max-w-md mx-auto bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-lg">

        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          {isLogin ? "Login" : "Criar Conta"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 mb-4 rounded-xl bg-black/40 border border-white/10"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl bg-black/40 border border-white/10"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-6 rounded-xl bg-black/40 border border-white/10"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-400 text-black py-4 rounded-xl font-semibold hover:bg-yellow-300 transition"
        >
          {isLogin ? "Entrar" : "Cadastrar"}
        </button>

        <p
          className="text-center mt-6 text-gray-400 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Não tem conta? Criar agora"
            : "Já tem conta? Fazer login"}
        </p>
      </div>
    </section>
  );
}

// SEÇÃO DE CARRINHO COM SIMULAÇÃO DE COR E RESUMO DE COMPRA
function Cart({ user, setUser }) {
  const buyer = user?.name;
  const [car, setCar] = useState(cars[0]);
  const [color, setColor] = useState("Preto");
  const [payment, setPayment] = useState("avista");
  const [confirmed, setConfirmed] = useState(false);

  const colorMap = {
    Preto: "#000000",
    Branco: "#ffffff",
    Vermelho: "#ff0000",
    Azul: "#0066ff",
    Amarelo: "#ffd000",
  };

  const parsePrice = (price) => {
    return Number(price.replace("R$ ", "").replace(/\./g, "").replace(",", "."));
  };

  const basePrice = parsePrice(car.price);

  let finalPrice = basePrice;

  if (payment === "avista") {
    finalPrice = basePrice * 0.9; // 10% desconto
  } else {
    finalPrice = basePrice * 1.3; // 30% juros
  }

  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleConfirm = () => {
    if (!buyer) return alert("Digite o nome do comprador");
    setConfirmed(true);
  };
  // 🎨 Filtro visual para simular cor
  const colorFilter = {
    Preto: "brightness(0.5)",
    Branco: "brightness(1.2)",
    Vermelho: "hue-rotate(-20deg) saturate(2)",
    Azul: "hue-rotate(180deg) saturate(2)",
    Amarelo: "hue-rotate(60deg) saturate(2)",
  };

  return (
    <section className="bg-zinc-950 text-white py-28 px-6">
      <div className="max-w-4xl mx-auto bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-lg">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400">
            Logado como <span className="text-yellow-400">{user.name}</span>
          </p>

          <button
            onClick={() => {
              localStorage.removeItem("vortexUser");
              setUser(null);
            }}
            className="text-sm text-red-400 hover:text-red-300 transition"
          >
            Sair da conta
          </button>
        </div>
        <h2 className="text-4xl font-bold text-yellow-400 mb-10 text-center">
          Finalizar Compra
        </h2>

        <div className="space-y-6">



          <select
            value={car.id}
            onChange={(e) =>
              setCar(cars.find((c) => c.id === Number(e.target.value)))
            }
            className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:border-yellow-400 outline-none"
          >
            {cars.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:border-yellow-400 outline-none"
          >
            <option>Preto</option>
            <option>Branco</option>
            <option>Vermelho</option>
            <option>Azul</option>
            <option>Amarelo</option>
          </select>

          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:border-yellow-400 outline-none"
          >
            <option value="avista">À Vista (10% desconto)</option>
            <option value="financiado">Financiado (30% juros)</option>
          </select>

          <div className="mt-8 p-6 bg-black/40 rounded-xl border border-yellow-400/30">
            <h3 className="text-2xl font-bold mb-4">Resumo da Compra</h3>

            <p><strong>Comprador:</strong> {buyer || "—"}</p>
            <p><strong>Carro:</strong> {car.name}</p>
            <p><strong>Cor:</strong> {color}</p>
            <p><strong>Pagamento:</strong> {payment === "avista" ? "À Vista" : "Financiado"}</p>

            <p className="text-yellow-400 text-2xl font-bold mt-6">
              Valor Final: {formatCurrency(finalPrice)}
            </p>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full bg-yellow-400 text-black py-4 rounded-xl font-semibold hover:bg-yellow-300 transition"
          >
            Confirmar Compra
          </button>

          {/* 🔥 CONFIRMAÇÃO VISUAL */}
          {confirmed && (
            <div className="mt-10 p-8 bg-black/60 border border-green-500 rounded-2xl text-center animate-fadeIn">
              <h3 className="text-3xl font-bold text-green-400 mb-6">
                🚗 Compra Confirmada!
              </h3>

              <div className="relative mx-auto h-64 w-full max-w-md">
                <img
                  src={car.images ? car.images[0] : car.image}
                  alt={car.name}
                  className="h-64 w-full object-contain relative z-10"
                />

                {/* Camada de cor */}
                <div
                  className="absolute inset-0 z-20 rounded-xl"
                  style={{
                    backgroundColor: colorMap[color],
                    mixBlendMode: "multiply",
                    opacity: 0.6,
                  }}
                />
              </div>
              <p className="mt-6 text-lg">
                {buyer}, seu <span className="text-yellow-400">{car.name}</span> na cor{" "}
                <span className="text-yellow-400">{color}</span> está sendo preparado!
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
// SEÇÃO DE VÍDEO COM DESEMPENHO EXTREMO E DESIGN FUTURISTA
function VideoShowcase() {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <video
          className="w-full h-[600px] object-cover"
          src="/ferrari luxo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </section>
  );
}
// SEÇÃO DE DESEMPENHO COM NÚMEROS ANIMADOS E DESIGN IMPACTANTE
function Performance() {
  return (
    <section
      id="performance"
      className="bg-black text-white py-32 text-center px-6"
    >
      <h2 className="text-5xl font-bold text-yellow-400 mb-20">
        Engineering Excellence
      </h2>

      <div className="grid md:grid-cols-3 gap-16 max-w-5xl mx-auto">
        <div>
          <h3 className="text-6xl font-bold">
            <CountUp end={1000} duration={4} />+
          </h3>
          <p className="text-gray-400 mt-4">Horsepower</p>
        </div>

        <div>
          <h3 className="text-6xl font-bold">
            <CountUp end={2.4} duration={4} decimals={1} />s
          </h3>
          <p className="text-gray-400 mt-4">0-100 km/h</p>
        </div>

        <div>
          <h3 className="text-6xl font-bold">
            <CountUp end={350} duration={4} />+
          </h3>
          <p className="text-gray-400 mt-4">Top Speed (km/h)</p>
        </div>
      </div>
    </section>
  );
}
// SEÇÃO DE CONTATO COM FORMULÁRIO E DESIGN LUXUOSO
function Contact() {
  const phone = "5579999999999"; // COLOQUE SEU NÚMERO AQUI

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-zinc-950 to-black text-white py-28 px-6"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-yellow-400 mb-12">
          Private Consultation
        </h2>

        {/* WHATSAPP */}
        <div className="mb-10">
          <p className="text-gray-400 mb-4">
            Atendimento exclusivo via WhatsApp:
          </p>

          <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-4 rounded-full transition"
          >
            📲 Falar com Consultor VIP
          </a>

          <p className="mt-4 text-gray-500">
            WhatsApp: +55 (79) 99999-9999
          </p>
        </div>

        {/* FORMULÁRIO */}
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400"
          />

          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400"
          />

          <button className="w-full bg-yellow-400 text-black py-4 rounded-xl font-semibold hover:bg-yellow-300 transition">
            Request VIP Access
          </button>
        </form>
      </div>
    </section>
  );
}
// RODAPÉ COM DESIGN SÓBRIO E INFORMAÇÃO DE COPYRIGHT
function Footer() {
  return (
    <footer className="bg-black text-gray-500 py-8 text-center border-t border-white/10">
      © 2026 Vortex Elite Motors — Luxury Redefined
    </footer>
  );
}
// COMPONENTE PRINCIPAL QUE REUNE TODAS AS SEÇÕES
export default function App() {
  const [user, setUser] = useState(null);

  // Verifica se já existe usuário salvo
  useEffect(() => {
    const savedUser = localStorage.getItem("vortexUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <>
      <BackgroundMusic />
      <Navbar />
      <Hero />
      <Collection />
      <VideoShowcase />

      {!user ? (
        <Auth onLogin={setUser} />
      ) : (
        <Cart user={user} setUser={setUser} />
      )}

      <Performance />
      <Contact />
      <Footer />
    </>
  );
}