import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, PiggyBank, Layers, CreditCard, Wallet, Share2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";

const colors = {
  primary: "#F26A21",
  dark: "#333333",
  light: "#F8F8F8",
  gray: "#6B7280",
  success: "#10B981",
  amber: "#F59E0B",
};

const trimestrais = [
  { t: "1º TRI", vendasBrutas: 572890.14, deducoes: 108080.34, vendasLiquidas: 490882.91, custos: 184103.88, lucro: -3275.07 },
  { t: "2º TRI", vendasBrutas: 879849.28, deducoes: 169198.63, vendasLiquidas: 749095.81, custos: 405599.28, lucro: 20503.48 },
  { t: "3º TRI", vendasBrutas: 596860.42, deducoes: 117987.37, vendasLiquidas: 506090.21, custos: 239507.64, lucro: -15653.51 },
  { t: "4º TRI", vendasBrutas: 727191.76, deducoes: 169363.59, vendasLiquidas: 605067.33, custos: 247169.91, lucro: 44702.63 },
];

const saldosPorTri = {
  "1º TRI": {
    disp: 180662.8,
    cr: 250360.61,
    est: 332982.78,
    ac: 770409.76,
    pc: 945472.99,
    forn: 492834.02,
    trib: 21762.95,
    emp: 258000.0,
    lucAcum: 121042.74,
    lucDist: 50000.0,
  },
  "2º TRI": {
    disp: 118336.74,
    cr: 458199.01,
    est: 266820.31,
    ac: 844649.56,
    pc: 995223.93,
    forn: 537852.96,
    trib: 35288.53,
    emp: 258000.0,
    lucAcum: 121042.74,
    lucDist: 50000.0,
  },
  "3º TRI": {
    disp: 67601.07,
    cr: 312631.51,
    est: 262900.2,
    ac: 647701.98,
    pc: 859944.48,
    forn: 482781.41,
    trib: 17653.59,
    emp: 228000.0,
    lucAcum: 121042.74,
    lucDist: 100000.0,
  },
  "4º TRI": {
    disp: 65019.51,
    cr: 366969.15,
    est: 263050.81,
    ac: 695790.94,
    pc: 859345.43,
    forn: 508587.82,
    trib: 35308.4,
    emp: 228000.0,
    lucAcum: 27060.83,
    lucDist: 0.0,
  },
};

export default function DashboardDunnas() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("Todos");

  const filtrar = () =>
    periodoSelecionado === "Todos"
      ? trimestrais
      : trimestrais.filter((x) => x.t === periodoSelecionado);

  const data = filtrar();
  const sum = (k) => data.reduce((acc, it) => acc + it[k], 0);

  const vendasBrutas = sum("vendasBrutas");
  const deducoes = sum("deducoes");
  const receitaLiquida1 = vendasBrutas;
  const vendasLiquidas = sum("vendasLiquidas");
  const custos = sum("custos");
  const lucro = sum("lucro");
  const margemBrutaPct = vendasLiquidas > 0 ? (vendasLiquidas - custos) / vendasLiquidas : 0;

  const analiseVertical = {
    "1º TRI": {
      pessoal: { valor: 123203.5, pct: 25.1 },
      ocupacao: { valor: 124904.38, pct: 25.44 },
      vendas: { valor: 27433.31, pct: 5.59 },
    },
    "2º TRI": {
      pessoal: { valor: 143385.12, pct: 19.14 },
      ocupacao: { valor: 96662.25, pct: 12.9 },
      vendas: { valor: 51467.47, pct: 6.87 },
    },
    "3º TRI": {
      pessoal: { valor: 119864.85, pct: 23.68 },
      ocupacao: { valor: 96834.61, pct: 19.13 },
      vendas: { valor: 30680.31, pct: 6.06 },
    },
    "4º TRI": {
      pessoal: { valor: 129718.57, pct: 21.44 },
      ocupacao: { valor: 102988.67, pct: 17.02 },
      vendas: { valor: 34831.21, pct: 5.76 },
    },
    Todos: {
      pessoal: { valor: 516172.04, pct: 21.95 },
      ocupacao: { valor: 421389.91, pct: 17.92 },
      vendas: { valor: 144412.3, pct: 6.14 },
    },
  };

  const lucratividadeTri = {
    "1º TRI": -0.67,
    "2º TRI": 2.74,
    "3º TRI": -3.09,
    "4º TRI": 7.39,
    "Todos": 1.97,
  };

  const ultimoTri = trimestrais[trimestrais.length - 1]?.t;
  const saldo = periodoSelecionado === "Todos" ? saldosPorTri[ultimoTri] : saldosPorTri[periodoSelecionado];
  const { disp, cr, est, ac, pc, forn, trib, emp, lucAcum, lucDist } = saldo;

  const lc = ac && pc ? ac / pc : null;
  const ls = ac && pc && est > 0 ? (ac - est) / pc : null;
  const li = pc ? disp / pc : null;

  const currency = (v) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const show = (v) => (v === null || v === undefined || isNaN(v) ? "—" : v.toFixed(2));

  return (
    <div className="min-h-screen bg-white text-[color:var(--dark)]" style={{ "--dark": colors.dark }}>
      <div className="sticky top-0 z-30 border-b" style={{ background: colors.light, borderColor: "#eee" }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-28 flex items-center justify-center rounded" style={{ background: colors.primary }}>
              <span className="text-white text-sm font-semibold">NBRAUPP</span>
            </div>
            <div className="hidden md:block text-sm text-gray-600">
              DUNNAS — Análise Contábil-Financeira • 2025
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Filtrar período:</label>
            <select
              value={periodoSelecionado}
              onChange={(e) => setPeriodoSelecionado(e.target.value)}
              className="border rounded-lg px-3 py-1 text-sm"
            >
              <option>Todos</option>
              <option>1º TRI</option>
              <option>2º TRI</option>
              <option>3º TRI</option>
              <option>4º TRI</option>
            </select>
            <Button
              className="rounded-2xl"
              style={{ background: colors.primary }}
              onClick={() => navigator.clipboard.writeText(window.location.href)}
            >
              <Share2 className="h-4 w-4 mr-2" />Copiar link
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <Tabs defaultValue="resumo">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-white">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="vendas">Vendas & Margens</TabsTrigger>
            <TabsTrigger value="indices">Indicadores</TabsTrigger>
            <TabsTrigger value="parecer">Parecer</TabsTrigger>
            <TabsTrigger value="demo">Demonstrativos</TabsTrigger>
          </TabsList>

          <TabsContent value="resumo" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-stretch auto-rows-fr">
              {[
                { title: "Receita Líquida (Acumulada)", value: vendasLiquidas, icon: <TrendingUp className="h-5 w-5" />, bg: "#FFF4ED" },
                { title: "Lucro líquido", value: lucro, icon: <PiggyBank className="h-5 w-5" />, bg: "#FFF9EA" },
                { title: "Disponibilidades", value: disp, icon: <Wallet className="h-5 w-5" />, bg: "#EFF6FF" },
                { title: "Contas a receber", value: cr, icon: <CreditCard className="h-5 w-5" />, bg: "#FEF3C7" },
                { title: "Estoque", value: est, icon: <Layers className="h-5 w-5" />, bg: "#EEF2FF" },
                { title: "Fornecedores a pagar", value: forn, icon: <CreditCard className="h-5 w-5" />, bg: "#FEE2E2" },
              ].map((c) => (
                <Card key={c.title} className="rounded-2xl shadow-sm border h-full min-h-[120px]" style={{ borderColor: "#eee" }}>
                  <CardContent className="p-4 rounded-2xl h-full flex flex-col justify-between" style={{ background: c.bg }}>
                    <div className="flex items-start justify-between gap-2 text-sm text-gray-600">
                      <span className="leading-snug">{c.title}</span>
                      {c.icon}
                    </div>
                    <div className="mt-2 text-xl font-semibold" style={{ color: colors.dark }}>
                      {currency(c.value)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="rounded-2xl shadow-sm border" style={{ borderColor: "#eee" }}>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-medium">Resumo Executivo</h3>

                {periodoSelecionado === "1º TRI" && (
                  <>
                    <p className="text-sm text-gray-700">
                      O 1º trimestre apresentou receita líquida de <b>{currency(vendasLiquidas)}</b>, com prejuízo líquido de <b>{currency(lucro)}</b>. Mesmo com margem bruta positiva, o resultado foi pressionado pelo peso das despesas operacionais e financeiras no início do exercício.
                    </p>
                    <p className="text-sm text-gray-700">
                      O fechamento mostrou disponibilidades de <b>{currency(disp)}</b>, contas a receber de <b>{currency(cr)}</b> e estoque de <b>{currency(est)}</b>, com estrutura de capital de giro apertada frente ao passivo circulante.
                    </p>
                    <p className="text-sm text-gray-700">
                      A prioridade gerencial do período é reforçar caixa, acelerar giro de estoque e melhorar conversão das vendas em resultado líquido.
                    </p>
                  </>
                )}

                {periodoSelecionado === "2º TRI" && (
                  <>
                    <p className="text-sm text-gray-700">
                      O 2º trimestre representou recuperação operacional, com receita líquida de <b>{currency(vendasLiquidas)}</b> e lucro líquido de <b>{currency(lucro)}</b>. O período se beneficiou da sazonalidade comercial e de maior diluição dos custos fixos.
                    </p>
                    <p className="text-sm text-gray-700">
                      O aumento das contas a receber para <b>{currency(cr)}</b> acompanhou o crescimento das vendas, enquanto o caixa encerrou o período em <b>{currency(disp)}</b>, ainda exigindo disciplina de capital de giro.
                    </p>
                    <p className="text-sm text-gray-700">
                      A melhora do trimestre confirma potencial comercial, mas a sustentabilidade depende de controle contínuo das despesas e do ritmo de recebimento.
                    </p>
                  </>
                )}

                {periodoSelecionado === "3º TRI" && (
                  <>
                    <p className="text-sm text-gray-700">
                      No 3º trimestre houve desaceleração do desempenho, com receita líquida de <b>{currency(vendasLiquidas)}</b> e prejuízo líquido de <b>{currency(lucro)}</b>. A operação voltou a sentir pressão das despesas sobre a margem gerada.
                    </p>
                    <p className="text-sm text-gray-700">
                      O caixa caiu para <b>{currency(disp)}</b>, enquanto o ativo circulante perdeu força e o passivo de curto prazo permaneceu elevado, indicando maior sensibilidade financeira.
                    </p>
                    <p className="text-sm text-gray-700">
                      O foco deve ser ajuste de estrutura, fortalecimento do caixa e preparação do mix para o último trimestre, evitando carregar custos fixos acima da capacidade de geração de resultado.
                    </p>
                  </>
                )}

                {periodoSelecionado === "4º TRI" && (
                  <>
                    <p className="text-sm text-gray-700">
                      O 4º trimestre encerrou o ano com retomada do lucro, somando receita líquida de <b>{currency(vendasLiquidas)}</b> e resultado líquido de <b>{currency(lucro)}</b>. A sazonalidade favoreceu o desempenho comercial e a absorção de parte da estrutura fixa.
                    </p>
                    <p className="text-sm text-gray-700">
                      Apesar da melhora do resultado, o fechamento mostra disponibilidades reduzidas em <b>{currency(disp)}</b>, o que reforça atenção ao ciclo financeiro e à necessidade de preservação do caixa.
                    </p>
                    <p className="text-sm text-gray-700">
                      A empresa termina o exercício com sinal de recuperação, porém ainda dependente de disciplina operacional e financeira para sustentar o desempenho no curto prazo.
                    </p>
                  </>
                )}

                {periodoSelecionado === "Todos" && (
                  <>
                    <p className="text-sm text-gray-700">
                      O acumulado de janeiro a dezembro evidencia receita líquida de <b>{currency(vendasLiquidas)}</b> e lucro líquido total de <b>{currency(lucro)}</b>. O ano foi marcado por oscilação entre trimestres, com recuperação relevante no 2º e no 4º TRI.
                    </p>
                    <p className="text-sm text-gray-700">
                      O fechamento do exercício mostra caixa de <b>{currency(disp)}</b>, contas a receber de <b>{currency(cr)}</b> e estoque de <b>{currency(est)}</b>, com pressão de capital de giro e liquidez de curto prazo abaixo do ideal.
                    </p>
                    <p className="text-sm text-gray-700">
                      A margem bruta consolidada de <b>{(margemBrutaPct * 100).toFixed(1)}%</b> é positiva, mas o lucro final foi comprimido pelo peso das despesas operacionais, especialmente folha e ocupação. O negócio demonstra capacidade comercial, porém com baixa eficiência estrutural.
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendas" className="space-y-4">
            <Card className="rounded-2xl shadow-sm border" style={{ borderColor: "#eee" }}>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Vendas Brutas x Deduções</h3>
                <p className="text-xs text-gray-600 mb-2">
                  O custo da mercadoria vendida e os encargos sobre vendas impactam diretamente a capacidade de geração de margem. A operação demonstrou boa tração comercial, mas sensível ao peso das deduções e da estrutura de custos.
                </p>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="t" />
                    <YAxis tickFormatter={(v) => currency(v)} />
                    <Tooltip formatter={(v) => currency(Number(v))} />
                    <Legend />
                    <Bar dataKey="custos" name="Custos" fill={colors.gray} radius={8} />
                    <Bar dataKey="vendasBrutas" name="Vendas Brutas" fill={colors.primary} radius={8} />
                    <Bar dataKey="deducoes" name="Deduções" fill={colors.amber} radius={8} />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-xs text-gray-600 mt-2">
                  A leitura dos trimestres mostra que a empresa mantém boa margem bruta, porém o ganho final depende do controle simultâneo de CMV, devoluções, impostos e despesas operacionais.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border" style={{ borderColor: "#eee" }}>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Lucro Líquido por Trimestre</h3>
                <p className="text-xs text-gray-600 mb-2">
                  A oscilação do lucro evidencia dependência de sazonalidade e de melhor diluição da estrutura fixa. Trimestres com receita menor ficaram mais pressionados pelo peso das despesas operacionais.
                </p>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="t" />
                    <YAxis tickFormatter={(v) => currency(v)} />
                    <Tooltip formatter={(v) => currency(Number(v))} />
                    <Legend />
                    <Line dataKey="lucro" name="Lucro Líquido" stroke={colors.success} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="indices" className="space-y-4">
            <Card className="rounded-2xl shadow-sm border" style={{ borderColor: "#eee" }}>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-medium mb-2">Indicadores Financeiros</h3>
                <p className="text-xs text-gray-600 mb-2">
                  Os indicadores abaixo mostram a capacidade da empresa em honrar obrigações de curto prazo e transformar vendas em segurança financeira.
                </p>
                <div className="mb-2">
                  <p className="text-sm text-gray-700">Liquidez Corrente: <b>{show(lc)}</b></p>
                  <p className="text-xs text-gray-600 mt-1">
                    Mede se o ativo circulante é suficiente para cobrir o passivo circulante. No fechamento anual, o índice abaixo de 1 mostra pressão de curto prazo.
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-700">Liquidez Seca: <b>{show(ls)}</b></p>
                  <p className="text-xs text-gray-600 mt-1">
                    Exclui o estoque da análise. O indicador reduzido evidencia dependência da venda das mercadorias para sustentar compromissos imediatos.
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-700">Liquidez Imediata: <b>{show(li)}</b></p>
                  <p className="text-xs text-gray-600 mt-1">
                    Mostra a cobertura imediata apenas com caixa e equivalentes. O patamar baixo reforça a necessidade de gestão rigorosa do fluxo de caixa.
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-700">Margem Bruta: <b>{(margemBrutaPct * 100).toFixed(1)}%</b></p>
                  <p className="text-xs text-gray-600 mt-1">
                    Indica quanto sobra após os custos diretos. A margem é saudável, mas ainda insuficiente para compensar integralmente o peso da estrutura operacional.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border" style={{ borderColor: "#eee" }}>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-medium mb-2">Análise Vertical da DRE — % sobre Receita Líquida</h3>
                <p className="text-xs text-gray-600">
                  Destaques da estrutura de resultado considerando a Receita Líquida 2 como base de 100%.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>Custo com pessoal geral:</b> {currency(analiseVertical[periodoSelecionado].pessoal.valor)} <span className="text-gray-500">({analiseVertical[periodoSelecionado].pessoal.pct.toFixed(2)}%)</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>Custo total de ocupação:</b> {currency(analiseVertical[periodoSelecionado].ocupacao.valor)} <span className="text-gray-500">({analiseVertical[periodoSelecionado].ocupacao.pct.toFixed(2)}%)</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>Despesas com vendas:</b> {currency(analiseVertical[periodoSelecionado].vendas.valor)} <span className="text-gray-500">({analiseVertical[periodoSelecionado].vendas.pct.toFixed(2)}%)</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>Lucratividade do período:</b> <span className="text-gray-500">({lucratividadeTri[periodoSelecionado].toFixed(2)}%)</span>
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  A leitura evidencia que os maiores impactos sobre a receita líquida estão concentrados em pessoal, ocupação e despesas com vendas. A lucratividade apresenta forte oscilação entre os trimestres, com prejuízos no início e no terceiro período, e recuperação relevante no fechamento do exercício.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parecer" className="space-y-3">
            <Card className="rounded-2xl shadow-sm border" style={{ borderColor: "#eee" }}>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-medium mb-2">Parecer Técnico</h3>

                {periodoSelecionado === "1º TRI" && (
                  <>
                    <p className="text-sm text-gray-700">
                      O 1º trimestre fechou com prejuízo e liquidez pressionada, indicando que a margem gerada não foi suficiente para absorver o peso das despesas operacionais no início do exercício.
                    </p>
                    <p className="text-sm text-gray-700">
                      Recomenda-se reforçar capital de giro, revisar ritmo de compras e ajustar a estrutura de gastos fixos para preservar caixa e reduzir exposição de curto prazo.
                    </p>
                    <p className="text-sm text-gray-700">
                      A prioridade é melhorar eficiência operacional e converter receita em resultado líquido consistente nos trimestres seguintes.
                    </p>
                  </>
                )}

                {periodoSelecionado === "2º TRI" && (
                  <>
                    <p className="text-sm text-gray-700">
                      O 2º trimestre demonstrou recuperação operacional, com melhor aproveitamento da sazonalidade e resultado positivo, confirmando capacidade comercial da empresa.
                    </p>
                    <p className="text-sm text-gray-700">
                      Apesar da melhora, a operação ainda requer disciplina sobre custos e despesas para impedir que o ganho de faturamento seja consumido pela estrutura fixa.
                    </p>
                    <p className="text-sm text-gray-700">
                      A recomendação é preservar caixa, acompanhar recebíveis e manter rigor na gestão de folha, ocupação e despesas financeiras.
                    </p>
                  </>
                )}

                {periodoSelecionado === "3º TRI" && (
                  <>
                    <p className="text-sm text-gray-700">
                      O 3º trimestre voltou a apresentar prejuízo, revelando fragilidade na sustentação da rentabilidade fora dos períodos de maior sazonalidade.
                    </p>
                    <p className="text-sm text-gray-700">
                      O comportamento do caixa e da liquidez sugere atenção imediata ao capital de giro, com foco em recebimento, renegociação de despesas e controle de estoques.
                    </p>
                    <p className="text-sm text-gray-700">
                      O período exige ajustes estruturais para que o crescimento de vendas se converta em resultado mais estável e previsível.
                    </p>
                  </>
                )}

                {periodoSelecionado === "4º TRI" && (
                  <>
                    <p className="text-sm text-gray-700">
                      O 4º trimestre confirmou retomada do lucro, apoiada pela sazonalidade típica do varejo e melhor diluição da estrutura operacional.
                    </p>
                    <p className="text-sm text-gray-700">
                      Ainda assim, o caixa de fechamento permanece baixo, o que exige cautela na virada do exercício e forte acompanhamento dos compromissos de curto prazo.
                    </p>
                    <p className="text-sm text-gray-700">
                      A recomendação é consolidar a recuperação com foco em fluxo de caixa, redução de despesas fixas e manutenção da margem comercial.
                    </p>
                  </>
                )}

                {periodoSelecionado === "Todos" && (
                  <>
                    <p className="text-sm text-gray-700">
                      No acumulado do ano, a empresa demonstrou capacidade de venda e margem bruta saudável, porém com rentabilidade líquida reduzida em função do elevado peso das despesas operacionais.
                    </p>
                    <p className="text-sm text-gray-700">
                      A situação patrimonial evidencia pressão de capital de giro, com liquidez de curto prazo abaixo do ideal e redução de disponibilidades ao longo do exercício.
                    </p>
                    <p className="text-sm text-gray-700">
                      Prioridades para o próximo ciclo: reduzir despesas estruturais, preservar caixa, acelerar recebíveis e sustentar a margem comercial com maior eficiência operacional.
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demo" className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="rounded-2xl shadow-sm border" style={{ borderColor: "#eee" }}>
              <CardContent className="p-4 space-y-1">
                <h3 className="font-medium mb-2">DRE Resumida</h3>
                <p className="text-sm text-gray-700">Vendas Brutas: {currency(vendasBrutas)}</p>
                <p className="text-sm text-gray-700">Receita Líquida 1: {currency(receitaLiquida1)}</p>
                <p className="text-sm text-gray-700">Deduções: {currency(deducoes)}</p>
                <p className="text-sm text-gray-700">Receita Líquida 2: {currency(vendasLiquidas)}</p>
                <p className="text-sm text-gray-700">Custos: {currency(custos)}</p>
                <p className="text-sm text-gray-700">Lucro Líquido: {currency(lucro)}</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border" style={{ borderColor: "#eee" }}>
              <CardContent className="p-4 space-y-1">
                <h3 className="font-medium mb-2">Balanço Patrimonial (Fechamento)</h3>
                <p className="text-sm text-gray-700">Ativo Circulante: {ac ? currency(ac) : "—"}</p>
                <p className="text-sm text-gray-700">Passivo Circulante: {pc ? currency(pc) : "—"}</p>
                <p className="text-sm text-gray-700">Disponibilidades: {currency(disp)}</p>
                <p className="text-sm text-gray-700">Clientes: {currency(cr)}</p>
                <p className="text-sm text-gray-700">Estoque: {currency(est)}</p>
                <p className="text-sm text-gray-700">Fornecedores: {currency(forn)}</p>
                <p className="text-sm text-gray-700">Obrigações Tributárias: {currency(trib)}</p>
                <p className="text-sm text-gray-700">Empréstimos e Financiamentos: {currency(emp)}</p>
                <p className="text-sm text-gray-700">Lucros Acumulados: {currency(lucAcum)}</p>
                <p className="text-sm text-gray-700">Lucro Distribuído: {currency(lucDist)}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
          <span>Elaborado por: <b>Carlos Ranniê</b></span>
          <Badge className="rounded-2xl" style={{ background: colors.primary, color: "#fff" }}>
            NBRAUPP Contabilidade
          </Badge>
        </div>
      </div>
    </div>
  );
}
