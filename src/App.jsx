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
    }, 4000); // um pouco mais suave

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        relative 
        w-full 
        h-[55vh] 
        sm:h-[65vh] 
        md:h-[80vh] 
        lg:h-screen 
        overflow-hidden
      "
    >
      {cars.map((car, index) => (
        <motion.img
          key={car.id}
          src={car.images ? car.images[0] : car.image}
          alt={car.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="
            absolute 
            inset-0 
            w-full 
            h-full 
            object-cover 
            object-center
          "
        />
      ))}

      {/* Overlay responsivo */}
      <div className="absolute inset-0 bg-black/40 sm:bg-black/30 md:bg-black/20" />
    </div>
  );
}
// Navegação fixa
function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-4 flex justify-between items-center">

        {/* LOGO */}
        <h1 className="text-xl sm:text-2xl tracking-widest font-bold text-yellow-400">
          VORTEX ELITE
        </h1>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex space-x-10">
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

        {/* BOTÃO HAMBÚRGUER */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-6 space-y-6 text-center">
          <a
            href="#collection"
            onClick={() => setOpen(false)}
            className="block hover:text-yellow-400 transition"
          >
            Collection
          </a>
          <a
            href="#performance"
            onClick={() => setOpen(false)}
            className="block hover:text-yellow-400 transition"
          >
            Performance
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block hover:text-yellow-400 transition"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
// SEÇÃO HERO COM EFEITO DE SCROLL E SOM DE MOTOR
function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      className="
        relative
        min-h-[70vh]
        sm:min-h-[80vh]
        lg:min-h-screen
        flex
        items-center
        justify-center
        text-center
        overflow-hidden
      "
    >
      {/* CARROSSEL PARALLAX */}
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <Carrosel />
      </motion.div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60 sm:bg-black/50 md:bg-black/40" />

      {/* CONTEÚDO */}
      <div className="relative z-10 text-white max-w-5xl px-4 sm:px-6 md:px-8">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
            text-3xl
            sm:text-5xl
            md:text-7xl
            lg:text-8xl
            font-bold
            leading-tight
          "
        >
          DRIVE THE FUTURE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="
            mt-4
            sm:mt-6
            text-sm
            sm:text-base
            md:text-lg
            text-gray-300
          "
        >
          Performance extrema. Luxo absoluto. Tecnologia incomparável.
        </motion.p>

        <motion.a
          href="#collection"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            inline-block
            mt-6
            sm:mt-8
            md:mt-10
            bg-yellow-400
            text-black
            px-6
            sm:px-8
            md:px-10
            py-3
            sm:py-3.5
            md:py-4
            rounded-full
            font-semibold
            tracking-wide
            transition
          "
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
  const [imgIndex, setImgIndex] = useState(0);

  const parsePrice = (price) => {
    return Number(price.replace("R$ ", "").replace(/\./g, "").replace(",", "."));
  };

  const formatCurrency = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <section
      id="collection"
      className="bg-gradient-to-b from-black to-zinc-950 text-white py-16 sm:py-24 md:py-28 px-4 sm:px-8 md:px-12"
    >
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 md:mb-20 text-yellow-400">
        Elite Collection
      </h2>

      {/* GRID RESPONSIVA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
        {cars.map((car) => {
          const basePrice = parsePrice(car.price);
          const valorAvista = basePrice * 0.9;
          const valorFinanciado = basePrice * 1.3;

          return (
            <div
              key={car.id}
              onClick={() => {
                setSelectedCar(car);
                setImgIndex(0);
              }}
              className="cursor-pointer bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition duration-300"
            >
              <img
                src={car.images ? car.images[0] : car.image}
                alt={car.name}
                className="w-full h-52 sm:h-64 md:h-80 object-cover"
              />

              <div className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                  {car.name}
                </h3>

                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                  0-100 km/h: {car.speed}s
                </p>

                <p className="text-yellow-400 text-lg sm:text-xl font-semibold mt-3">
                  {car.price}
                </p>

                <div className="mt-4 text-gray-300 text-xs sm:text-sm space-y-1">
                  <p>
                    À Vista:{" "}
                    <span className="text-green-400">
                      {formatCurrency(valorAvista)}
                    </span>
                  </p>
                  <p>
                    Financiado:{" "}
                    <span className="text-red-400">
                      {formatCurrency(valorFinanciado)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL RESPONSIVO */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 md:p-10 relative">

            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-4 right-5 text-white text-2xl"
            >
              ✕
            </button>

            <img
              src={
                selectedCar.images
                  ? selectedCar.images[imgIndex]
                  : selectedCar.image
              }
              alt={selectedCar.name}
              className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-2xl mb-4"
            />

            {selectedCar.images && selectedCar.images.length > 1 && (
              <div className="flex gap-2 mb-6 justify-center">
                {selectedCar.images.map((img, i) => (
                  <button
                    key={i}
                    className={`w-12 h-12 border rounded ${imgIndex === i
                      ? "border-yellow-400"
                      : "border-white/30"
                      }`}
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

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
              {selectedCar.name}
            </h3>

            <p className="text-gray-300 mb-6 text-sm sm:text-base">
              {selectedCar.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-lg">
              <p><strong>Potência:</strong> {selectedCar.power} cv</p>
              <p><strong>0-100:</strong> {selectedCar.speed}s</p>
              <p><strong>Preço:</strong> {selectedCar.price}</p>
              <p>
                <strong>Financiado:</strong>{" "}
                {formatCurrency(parsePrice(selectedCar.price) * 1.3)}
              </p>
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

    const userData = { name, email, password };
    localStorage.setItem("vortexUser", JSON.stringify(userData));

    onLogin(userData);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white px-4 sm:px-6 py-16">
      <div className="w-full max-w-md bg-white/5 p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">

        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 sm:mb-8 text-center">
          {isLogin ? "Login" : "Criar Conta"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {!isLogin && (
            <input
              type="text"
              placeholder="Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 sm:p-4 mb-4 rounded-xl bg-black/40 border border-white/10 focus:border-yellow-400 focus:outline-none transition"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 sm:p-4 mb-4 rounded-xl bg-black/40 border border-white/10 focus:border-yellow-400 focus:outline-none transition"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 sm:p-4 mb-6 rounded-xl bg-black/40 border border-white/10 focus:border-yellow-400 focus:outline-none transition"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 sm:py-4 rounded-xl font-semibold hover:bg-yellow-300 active:scale-95 transition duration-300"
          >
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <p
          className="text-center mt-6 text-gray-400 text-sm sm:text-base cursor-pointer hover:text-yellow-400 transition"
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

  const parsePrice = (price) =>
    Number(price.replace("R$ ", "").replace(/\./g, "").replace(",", "."));

  const formatCurrency = (value) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const basePrice = parsePrice(car.price);

  let finalPrice =
    payment === "avista" ? basePrice * 0.9 : basePrice * 1.3;

  const handleConfirm = () => {
    if (!buyer) return alert("Digite o nome do comprador");
    setConfirmed(true);
  };

  return (
    <section className="bg-zinc-950 text-white min-h-screen py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white/5 p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <p className="text-gray-400 text-sm sm:text-base">
            Logado como{" "}
            <span className="text-yellow-400 font-semibold">
              {user?.name}
            </span>
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

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-8 sm:mb-10 text-center">
          Finalizar Compra
        </h2>

        <div className="space-y-5">

          {/* SELECT CARRO */}
          <select
            value={car.id}
            onChange={(e) =>
              setCar(cars.find((c) => c.id === Number(e.target.value)))
            }
            className="w-full p-3 sm:p-4 rounded-xl bg-black/40 border border-white/10 focus:border-yellow-400 outline-none transition"
          >
            {cars.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* SELECT COR */}
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-3 sm:p-4 rounded-xl bg-black/40 border border-white/10 focus:border-yellow-400 outline-none transition"
          >
            <option>Preto</option>
            <option>Branco</option>
            <option>Vermelho</option>
            <option>Azul</option>
            <option>Amarelo</option>
          </select>

          {/* SELECT PAGAMENTO */}
          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full p-3 sm:p-4 rounded-xl bg-black/40 border border-white/10 focus:border-yellow-400 outline-none transition"
          >
            <option value="avista">À Vista (10% desconto)</option>
            <option value="financiado">Financiado (30% juros)</option>
          </select>

          {/* RESUMO */}
          <div className="mt-6 p-5 sm:p-6 bg-black/40 rounded-xl border border-yellow-400/30">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              Resumo da Compra
            </h3>

            <div className="space-y-2 text-sm sm:text-base">
              <p><strong>Comprador:</strong> {buyer || "—"}</p>
              <p><strong>Carro:</strong> {car.name}</p>
              <p><strong>Cor:</strong> {color}</p>
              <p><strong>Pagamento:</strong> {payment === "avista" ? "À Vista" : "Financiado"}</p>
            </div>

            <p className="text-yellow-400 text-xl sm:text-2xl font-bold mt-6">
              Valor Final: {formatCurrency(finalPrice)}
            </p>
          </div>

          {/* BOTÃO */}
          <button
            onClick={handleConfirm}
            className="w-full bg-yellow-400 text-black py-3 sm:py-4 rounded-xl font-semibold hover:bg-yellow-300 active:scale-95 transition duration-300"
          >
            Confirmar Compra
          </button>

          {/* CONFIRMAÇÃO */}
          {confirmed && (
            <div className="mt-8 p-6 sm:p-8 bg-black/60 border border-green-500 rounded-2xl text-center animate-fadeIn">
              <h3 className="text-2xl sm:text-3xl font-bold text-green-400 mb-6">
                🚗 Compra Confirmada!
              </h3>

              <div className="relative mx-auto h-48 sm:h-64 w-full max-w-md">
                <img
                  src={car.images ? car.images[0] : car.image}
                  alt={car.name}
                  className="h-full w-full object-contain relative z-10"
                />

                <div
                  className="absolute inset-0 z-20 rounded-xl"
                  style={{
                    backgroundColor: colorMap[color],
                    mixBlendMode: "multiply",
                    opacity: 0.6,
                  }}
                />
              </div>

              <p className="mt-6 text-base sm:text-lg">
                {buyer}, seu{" "}
                <span className="text-yellow-400 font-semibold">
                  {car.name}
                </span>{" "}
                na cor{" "}
                <span className="text-yellow-400 font-semibold">
                  {color}
                </span>{" "}
                está sendo preparado!
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
    <section className="bg-black py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">

        {/* VIDEO */}
        <video
          className="
            w-full
            h-64
            sm:h-80
            md:h-[450px]
            lg:h-[600px]
            object-cover
          "
          src="/ferrari luxo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* OVERLAY PREMIUM */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

      </div>
    </section>
  );
}
// SEÇÃO DE DESEMPENHO COM NÚMEROS ANIMADOS E DESIGN IMPACTANTE
function Performance() {
  return (
    <section
      id="performance"
      className="bg-black text-white py-16 sm:py-24 md:py-32 text-center px-4 sm:px-6"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-12 sm:mb-16 md:mb-20">
        Engineering Excellence
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 md:gap-16 max-w-5xl mx-auto">

        {/* HORSEPOWER */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:scale-105 transition duration-300">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            <CountUp end={1000} duration={4} />+
          </h3>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Horsepower
          </p>
        </div>

        {/* 0-100 */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:scale-105 transition duration-300">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            <CountUp end={2.4} duration={4} decimals={1} />s
          </h3>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            0-100 km/h
          </p>
        </div>

        {/* TOP SPEED */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:scale-105 transition duration-300">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            <CountUp end={350} duration={4} />+
          </h3>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Top Speed (km/h)
          </p>
        </div>

      </div>
    </section>
  );
}
// SEÇÃO DE CONTATO COM FORMULÁRIO E DESIGN LUXUOSO
function Contact() {
  const phone = "5579999999999";

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-zinc-950 to-black text-white py-16 sm:py-24 md:py-28 px-4 sm:px-6"
    >
      <div className="max-w-2xl mx-auto text-center">

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-10 sm:mb-12">
          Private Consultation
        </h2>

        {/* WHATSAPP */}
        <div className="mb-10 sm:mb-12">
          <p className="text-gray-400 mb-4 text-sm sm:text-base">
            Atendimento exclusivo via WhatsApp:
          </p>

          <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block
              bg-green-500
              hover:bg-green-400
              active:scale-95
              text-black
              font-semibold
              px-6 sm:px-8
              py-3 sm:py-4
              rounded-full
              transition
              duration-300
            "
          >
            📲 Falar com Consultor VIP
          </a>

          <p className="mt-4 text-gray-500 text-sm sm:text-base">
            WhatsApp: +55 (79) 99999-9999
          </p>
        </div>

        {/* FORMULÁRIO */}
        <form className="space-y-5 sm:space-y-6 text-left">

          <input
            type="text"
            placeholder="Full Name"
            className="
              w-full
              p-3 sm:p-4
              rounded-xl
              bg-white/5
              border border-white/10
              focus:outline-none
              focus:border-yellow-400
              transition
            "
          />

          <input
            type="email"
            placeholder="Email Address"
            className="
              w-full
              p-3 sm:p-4
              rounded-xl
              bg-white/5
              border border-white/10
              focus:outline-none
              focus:border-yellow-400
              transition
            "
          />

          <textarea
            rows="4"
            placeholder="Your Message"
            className="
              w-full
              p-3 sm:p-4
              rounded-xl
              bg-white/5
              border border-white/10
              focus:outline-none
              focus:border-yellow-400
              transition
              resize-none
            "
          />

          <button
            type="submit"
            className="
              w-full
              bg-yellow-400
              text-black
              py-3 sm:py-4
              rounded-xl
              font-semibold
              hover:bg-yellow-300
              active:scale-95
              transition
              duration-300
            "
          >
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
    <footer className="bg-black text-gray-500 border-t border-white/10">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* LOGO */}
          <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 tracking-widest">
            VORTEX ELITE
          </h3>

          {/* LINKS */}
          <div className="flex gap-6 text-sm sm:text-base">
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

        </div>

        {/* DIVIDER */}
        <div className="my-8 border-t border-white/10" />

        {/* COPYRIGHT */}
        <p className="text-xs sm:text-sm text-center text-gray-600">
          © 2026 Vortex Elite Motors — Luxury Redefined
        </p>

      </div>
    </footer>
  );
}
// COMPONENTE PRINCIPAL QUE REUNE TODAS AS SEÇÕES
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("vortexUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black text-white scroll-smooth">

      <BackgroundMusic />

      <Navbar />

      <main className="w-full">

        {/* HERO */}
        <Hero />

        {/* CONTAINER PADRÃO RESPONSIVO */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <Collection />

          <VideoShowcase />

          {!user ? (
            <Auth onLogin={setUser} />
          ) : (
            <Cart user={user} setUser={setUser} />
          )}

          <Performance />

          <Contact />

        </div>

      </main>

      <Footer />

    </div>
  );
}
