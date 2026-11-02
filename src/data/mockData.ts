import { Company, IndustryTrendItem, JobPostingSample, LearningModule, PortfolioSample } from '../types';

export const COMPANIES: Company[] = [
  {
    id: 'samsung-electronics',
    name: '삼성전자 (DS부문)',
    industry: '반도체',
    logoText: 'SEC',
    ticker: '005930.KS',
    headquarters: '경기도 수원시 / 화성·평택 캠퍼스',
    overview: '글로벌 1위 메모리 반도체(DRAM, NAND Flash) 및 파운드리, 시스템 LSI 사업을 영위하는 첨단 반도체 기업입니다.',
    heroImage: '/src/assets/images/hero_semiconductor_fab_1793604989696.jpg',
    flagshipProducts: [
      {
        name: 'HBM3E / HBM4 (High Bandwidth Memory)',
        description: 'AI 가속기(GPU/NPU)용 초고대역폭 메모리로 2.5D/3D 첨단 패키징 및 TSV(실리콘 관통 전극) 기술 집약체',
        marketPosition: '글로벌 AI 메모리 핵심 공급사'
      },
      {
        name: '3nm / 2nm GAA (Gate-All-Around) 파운드리',
        description: 'FinFET 한계를 극복한 MBCFET™ 나노시트 구조 기반 초미세 로직 반도체',
        marketPosition: '차세대 첨단 미세공정 선도'
      },
      {
        name: 'V-NAND 플래시 메모리',
        description: '300단 이상 초고적층 3차원 수직 적층 낸드 플래시',
        marketPosition: '글로벌 낸드 시장 점유율 1위'
      }
    ],
    processFlows: [
      {
        productName: '초미세 로직 및 HBM 반도체 8대 공정 라인',
        summary: '단결정 실리콘 웨이퍼 투입부터 3D TSV 패키징까지 이어지는 클린룸 전/후공정 풀사이클',
        categoryNotice: '※ 본 공정도는 학술·공공 기술 표준 및 공개된 반도체 공학 원리를 기반으로 재구성되었으며, 기업의 비공개 대외비 공정 레시피와는 구별됩니다.',
        nodes: [
          {
            id: 'node-wafer',
            order: 1,
            name: '1. 웨이퍼 제조 (Wafer Fab)',
            shortDesc: '고순도 다결정 실리콘을 용융하여 단결정 잉곳 성장 후 슬라이싱 및 경면 연마(CMP)',
            detailedPrinciple: '초크랄스키(Czochralski) 공법으로 99.9999999% 초고순도 단결정 실리콘 잉곳을 성장시키고, 다이아몬드 와이어 톱으로 300mm 규격의 박판 웨이퍼로 절단한 뒤 표면 결함을 제거하기 위해 화학기계적 연마(CMP)를 수행합니다.',
            inDepthEngineering: '격자 결함(Dislocation), 점결함(Point Defect), 산소 침전물 제어가 핵심이며, 결정 방위(예: (100) 또는 (110))를 정확히 맞춰 전자의 이동도(Mobility)를 극대화합니다.',
            equipment: [
              { name: 'Czochralski Ingot Puller', maker: 'Siltronic/Sumco 계열', purpose: '초고온 실리콘 용융 및 단결정 잉곳 인상' },
              { name: 'Precision Wire Saw', maker: 'Meyer Burger', purpose: '초정밀 웨이퍼 슬라이싱' }
            ],
            keyTechnologies: ['단결정 잉곳 인상 속도 제어', '표면 거칠기(Ra < 0.1nm) 제어', 'Edge Beveling & Notch 가공'],
            qualityControlFactors: [
              { item: '두께 편차 (TTV, Total Thickness Variation)', target: '< 0.5 μm', risk: '초점 심도(DOF) 불량 및 노광 왜곡' },
              { item: '표면 파티클 수', target: '0개 (기준 19nm 이상 입자)', risk: '패턴 브릿지 및 게이트 파손' }
            ],
            relatedJobs: [
              { title: '웨이퍼 소재/기판 엔지니어', requiredSkills: ['재료공학', '결정구조학', 'X-ray 회절 분석'], description: '웨이퍼 물리적 특성 및 결함 분석' }
            ],
            interviewQuestions: [
              {
                question: '초크랄스키(CZ)법과 플로팅존(FZ)법의 차이점과 300mm 양산 웨이퍼에 CZ법을 주로 사용하는 이유는 무엇인가요?',
                tip: 'CZ법은 대구경(300mm) 제작에 유리하고 비용 효율적이며, FZ법은 산소 오염이 적으나 대구경 제작이 어렵다는 점을 설명하세요.',
                modelAnswer: 'CZ법은 도가니를 사용하여 대구경 잉곳 인상이 가능하고 산소 원자가 게터링(Gettering) 사이트로 작용하여 중금속 불순물을 흡착하는 이점이 있어 300mm 양산 라인의 표준으로 채택됩니다.'
              }
            ],
            verifiedStandard: true
          },
          {
            id: 'node-oxidation',
            order: 2,
            name: '2. 산화 공정 (Oxidation)',
            shortDesc: '웨이퍼 표면에 고온 산소 또는 수증기를 반응시켜 절연막(SiO2) 형성',
            detailedPrinciple: '실리콘 기판을 800~1100℃ 고온 전기로(Furnace)에서 건식 산소(O2) 또는 습식 수증기(H2O)와 반응시켜 균일하고 치밀한 이산화규소(SiO2) 보호막 및 절연막을 성장시킵니다.',
            inDepthEngineering: 'Deal-Grove 모델에 따라 초기 산화는 반응 억제 영역(Linear Rate), 두께 증가 후에는 산소 확산 억제 영역(Parabolic Rate)으로 전환됩니다. 습식 산화는 성장 속도가 빠르나 막질 치밀도가 낮고, 건식 산화는 얇고 치밀한 게이트 옥사이드 형성에 적합합니다.',
            equipment: [
              { name: 'Thermal Batch Furnace', maker: 'TEL / Kokusai Electric', purpose: '초고온 배치식 열산화막 형성' },
              { name: 'RTP (Rapid Thermal Processing)', maker: 'Applied Materials', purpose: '급속 열처리로 열예산(Thermal Budget) 최소화' }
            ],
            keyTechnologies: ['Deal-Grove 산화 속도 모델링', '열예산(Thermal Budget) 제어', '계면 결함 준위(Dit) 최소화'],
            qualityControlFactors: [
              { item: '산화막 두께 균일도 (Uniformity)', target: '±1.0% 이내', risk: '트랜지스터 문턱전압(Vth) 산포 발생' },
              { item: '절연 파괴 전압 (Breakdown Voltage)', target: '> 10 MV/cm', risk: '게이트 누설 전류 급증 및 소자 파괴' }
            ],
            relatedJobs: [
              { title: '반도체 공정기술 엔지니어', requiredSkills: ['열역학', '반도체 소자공학', 'Ellipsometry 두께 측정'], description: '퍼니스 챔버 조건 튜닝 및 산화막 질량 분석' }
            ],
            interviewQuestions: [
              {
                question: '건식 산화(Dry)와 습식 산화(Wet)의 반응 메커니즘과 응용처의 차이를 설명해 보세요.',
                tip: '산화제 분자 크기(O2 vs H2O), 확산 속도, 막의 밀도 차이를 수치/화학 반응식 관점에서 비교하세요.',
                modelAnswer: '건식 산화는 Si + O2 -> SiO2 반응으로 막이 치밀하여 고품질 게이트 산화막에 쓰이며, 습식 산화는 Si + 2H2O -> SiO2 + 2H2 반응으로 H2O의 높은 확산계수 덕에 성장속도가 5~10배 빨라 두꺼운 필드 산화막(Field Oxide) 및 마스킹층 형성에 적용됩니다.'
              }
            ],
            verifiedStandard: true
          },
          {
            id: 'node-photo',
            order: 3,
            name: '3. 포토 공정 (Photolithography)',
            shortDesc: '웨이퍼 상에 감광액(PR)을 도포하고 EUV/DUV 노광을 통해 미세 회로 패턴 전사',
            detailedPrinciple: '포토레지스트(PR) 도포(Spin Coating) → 소프트 베이크 → 정밀 광학 정렬(Alignment) → EUV(13.5nm) / ArFi(193nm) 노광(Exposure) → PEB(Post Exposure Bake) → 현상(Development)의 일련의 광학 화학 공정입니다.',
            inDepthEngineering: '레일리 공식(Rayleigh Criterion) R = k1 * (λ / NA)에 따라 해상도를 높이기 위해 EUV 파장 도입, High-NA(0.55), 화학증폭형 감광액(CAR), 확률적 결함(Stochastic Defect) 및 Line Edge Roughness(LER) 극복이 최첨단 과제입니다.',
            equipment: [
              { name: 'EUV Scanner (Twinscan EXE/NXE)', maker: 'ASML (독점)', purpose: '13.5nm 극자외선 기반 서브 3나노 회로 노광' },
              { name: 'Coater & Developer Track', maker: 'Tokyo Electron (TEL)', purpose: '웨이퍼 인라인 PR 도포 및 베이킹, 현상' }
            ],
            keyTechnologies: ['High-NA EUV 노광', 'Pellicle 투과율 최적화', 'OPC(광학 근접 보정, Optical Proximity Correction)'],
            qualityControlFactors: [
              { item: '임계 선폭 (Critical Dimension, CD)', target: '3nm 노드 기준 15nm 이하', risk: '회로 단선 또는 쇼트, 타이밍 딜레이' },
              { item: '오버레이 에러 (Overlay Error)', target: '< 1.5 nm', risk: '상하부 층간 회로 미스얼라인먼트' }
            ],
            relatedJobs: [
              { title: '포토 공정기술/설비 엔지니어', requiredSkills: ['광학', '고분자화학', 'CD-SEM 이미지 계측', 'EUV 광원 메커니즘'], description: '노광 도즈량(Dose), 초점 심도(Focus), 오버레이 제어' }
            ],
            interviewQuestions: [
              {
                question: '레일리 공식을 바탕으로 반도체 노광 공정에서 해상도(Resolution)를 개선하기 위한 3가지 접근 방법을 설명하세요.',
                tip: '파장(λ) 축소, 개구수(NA) 증가, 공정 변수(k1) 최소화의 3가지 변수를 구체적 기술(EUV, 액침, OPC)과 연결하세요.',
                modelAnswer: '레일리 공식 R = k1 * (λ/NA)에서 해상도를 낮출수록 미세 패턴 형성이 가능합니다. 1) 파장 단축: DUV(193nm)에서 EUV(13.5nm)로 전환, 2) 개구수 증대: 액침 렌즈(ArFi) 및 반사경을 통한 High-NA 도입, 3) 공정계수(k1) 감소: 위상 변위 마스크(PSM) 및 고도화된 광학근접보정(OPC)을 적용합니다.'
              }
            ],
            verifiedStandard: true
          },
          {
            id: 'node-etch',
            order: 4,
            name: '4. 식각 공정 (Etching)',
            shortDesc: '노광된 패턴을 제외한 불필요한 막질을 플라즈마 화학반응 및 이온 충격으로 제거',
            detailedPrinciple: '진공 챔버 내 반응성 가스에 RF 전력을 인가하여 고밀도 플라즈마를 형성합니다. 라디칼(Radical)에 의한 등방성 화학 식각과 이온 충격에 의한 비등방성 물리 식각이 결합된 RIE(Reactive Ion Etching) 및 ICP(Inductively Coupled Plasma) 공정으로 정밀 수직 프로파일을 만듭니다.',
            inDepthEngineering: '선택비(Selectivity = 식각 대상막 속도 / 마스크층 속도)와 이방성(Anisotropy) 유지가 핵심입니다. 고단수 3D NAND에서는 60:1 이상의 초고종횡비(HAR, High Aspect Ratio) 식각 시 보잉(Bowing) 및 틸팅(Tilting) 결함 방지가 최대 기술 난제입니다.',
            equipment: [
              { name: 'ICP Dry Etcher / Cryogenic Etcher', maker: 'Lam Research / Applied Materials', purpose: '초저온 및 고밀도 플라즈마 비등방성 건식 식각' },
              { name: 'ALE (Atomic Layer Etching)', maker: 'Lam Research', purpose: '원자층 단위의 자가 제한(Self-limiting) 극미세 식각' }
            ],
            keyTechnologies: ['극저온(Cryogenic) 초고종횡비 식각', 'Atomic Layer Etching (ALE)', '플라즈마 균일도 튜닝(Dual Frequency RF)'],
            qualityControlFactors: [
              { item: '식각 선택비 (Selectivity)', target: '> 50:1', risk: '하부 옥사이드/실리콘 침식 및 소자 불량' },
              { item: '프로파일 경사각 (Side Wall Angle)', target: '89.5° ~ 90.0°', risk: '상부 핀치오프(Pinch-off) 및 보이드(Void) 발생' }
            ],
            relatedJobs: [
              { title: '에칭 공정 엔지니어', requiredSkills: ['플라즈마 물리학', '진공공학', 'OES(광학 발광 분광법)'], description: '식각 종말점(EPD) 검출 및 챔버 가스 유량 최적화' }
            ],
            interviewQuestions: [
              {
                question: '건식 식각에서 물리적 식각(Sputtering)과 화학적 식각(Chemical)의 장단점을 비교하고, 둘을 혼합한 RIE의 장점을 설명하세요.',
                tip: '방향성(이방성 vs 등방성)과 선택비(높음 vs 낮음)를 대조한 후 RIE의 시너지(측벽 패시베이션)를 짚어주세요.',
                modelAnswer: '물리적 식각은 직진성이 뛰어나 이방성이 좋으나 선택비가 낮고 표면 손상이 큽니다. 화학적 식각은 선택비가 높으나 등방성이어서 언더컷이 발생합니다. RIE는 화학적 라디칼 반응과 이온 충격 에너지를 결합하여 측벽에 패시베이션 층을 형성함으로써 고선택비와 수직 이방성 프로파일을 동시에 달성합니다.'
              }
            ],
            verifiedStandard: true
          },
          {
            id: 'node-deposition',
            order: 5,
            name: '5. 박막 증착 및 이온 주입 (Thin Film & Ion Implantation)',
            shortDesc: '전도체/절연체 박막을 웨이퍼에 나노미터 두께로 형성하고 불순물을 주입하여 전기적 특성 부여',
            detailedPrinciple: '화학기상증착(CVD), 물리적증착(PVD), 원자층증착(ALD)을 통해 유전체 및 금속막을 형성하고, 고전압 가속기로 B(붕소), P(인), As(비소) 이온을 기판에 때려 박아 P형/N형 반도체 영역을 만듭니다.',
            inDepthEngineering: 'ALD는 전구체(Precursor) 주입 → 퍼지(Purge) → 반응가스 주입 → 퍼지의 자가포화 반응(Self-limiting) 사이클로 100%에 가까운 스텝 커버리지(Step Coverage)를 구현하여 고유전율(High-k) 절연막(HfO2, ZrO2)을 형성합니다.',
            equipment: [
              { name: 'ALD System (Atomic Layer Deposition)', maker: 'Applied Materials / 원익IPS', purpose: '원자층 단위 초정밀 박막 증착' },
              { name: 'High-Current Ion Implanter', maker: 'Axcelis / Applied Materials', purpose: '문턱전압 조절 및 소스/드레인 불순물 도핑' }
            ],
            keyTechnologies: ['High-k Metal Gate (HKMG)', '원자층 단위 Step Coverage', '초극박 채널 두께 제어'],
            qualityControlFactors: [
              { item: '박막 스텝 커버리지 (Step Coverage)', target: '> 98%', risk: '트렌치 내부 보이드 생성으로 인한 절연 파괴' },
              { item: '도핑 농도 및 접합 깊이 (Junction Depth)', target: '타겟치 대비 ±2%', risk: '단채널 효과(SCE) 및 펀치스루 발생' }
            ],
            relatedJobs: [
              { title: '박막/임플란트 공정 엔지니어', requiredSkills: ['기상화학 반응론', '고체물리학', 'SIMS 농도 분석'], description: '박막 균일도, 응력(Stress), 불순물 확산 억제 제어' }
            ],
            interviewQuestions: [
              {
                question: 'CVD와 ALD 공정의 메커니즘 차이와 미세 공정에서 ALD가 각광받는 이유를 설명하세요.',
                tip: '연속적 기상반응(CVD)과 표면 흡착 자가제한반응(ALD)의 메커니즘 차이를 설명하세요.',
                modelAnswer: 'CVD는 반응 가스를 동시에 주입하여 열이나 플라즈마로 표면 반응시켜 막을 성장시키므로 속도가 빠르지만 깊은 트렌치에서 스텝 커버리지가 떨어집니다. 반면 ALD는 전구체와 반응 가스를 순차적으로 분리 주입하여 표면 포화 흡착(Self-limiting)을 유도하므로 증착 속도는 느리지만 원자층 단위의 두께 정밀도와 복잡한 3D 구조에서도 100%에 가까운 우수한 단차 피복성을 제공합니다.'
              }
            ],
            verifiedStandard: true
          },
          {
            id: 'node-metal',
            order: 6,
            name: '6. 금속 배선 및 CMP (Metallization & CMP)',
            shortDesc: '트랜지스터 간 전기적 신호를 연결하기 위해 구리(Cu) 다마신 공정 및 평탄화 수행',
            detailedPrinciple: '트랜지스터 형성 후 층간 절연막(ILD)에 트렌치를 파고 확산 방지막(Ta/TaN)과 구리 시드층 증착 후 전기 도금(Electroplating)으로 구리를 채운 뒤, CMP로 표면을 연마하여 다층 배선 구조를 완성합니다.',
            inDepthEngineering: '구리는 건식 식각이 어려워 듀얼 다마신(Dual Damascene) 기법을 사용하며, 배선 폭이 좁아질수록 전자 풍(Electron Wind)에 의해 금속 원자가 이동하는 일렉트로마이그레이션(Electromigration) 현상을 억제해야 합니다.',
            equipment: [
              { name: 'ECD Copper Plater', maker: 'Lam Research (Sabre)', purpose: '구리 전기화학적 도금' },
              { name: 'Rotary CMP Polisher', maker: 'Applied Materials (Reflexion)', purpose: '슬러리(Slurry) 기반 나노 스케일 표면 평탄화' }
            ],
            keyTechnologies: ['Dual Damascene 구조화', 'Cu 일렉트로마이그레이션(EM) 내성 향상', 'Low-k 유전체 통합'],
            qualityControlFactors: [
              { item: '배선 저항 및 기생 커패시턴스 (RC Delay)', target: '스펙 규격치 만족', risk: '반도체 동작 주파수 저하' },
              { item: 'Dishing 및 Erosion 결함', target: '< 10 nm', risk: '상층 배선 단차 불량 및 단선' }
            ],
            relatedJobs: [
              { title: '금속 배선/평탄화 공정기술', requiredSkills: ['전기화학', '유변학(Rheology)', '신뢰성 수명 시험'], description: '슬러리 마모율 조절, RC 딜레이 최적화' }
            ],
            interviewQuestions: [
              {
                question: '반도체 배선 소재가 알루미늄(Al)에서 구리(Cu)로 전환된 배경과, 구리 식각을 위해 다마신(Damascene) 공정을 쓰는 이유를 설명하세요.',
                tip: '비저항 차이와 보일링 포인트(식각 부산물 휘발성) 특성을 근거로 대답하세요.',
                modelAnswer: '미세화로 배선 저항과 신호 지연(RC Delay)이 심해짐에 따라 알루미늄보다 비저항이 약 40% 낮고 일렉트로마이그레이션 내성이 뛰어난 구리를 도입했습니다. 다만 구리는 상온에서 휘발성 반응 부산물을 형성하지 않아 일반 플라즈마 건식 식각이 불가능하므로, 절연막에 먼저 홈을 파고 구리를 채운 후 불필요한 부분을 깎아내는 CMP 기반 다마신 공정을 채택했습니다.'
              }
            ],
            verifiedStandard: true
          },
          {
            id: 'node-eds',
            order: 7,
            name: '7. 웨이퍼 테스트 (EDS - Electrical Die Sorting)',
            shortDesc: '웨이퍼 단계에서 수억 개의 칩마다 프로브 카드를 접촉시켜 전기적 동작 양품/불량 선별 및 수율 분석',
            detailedPrinciple: '프로브 스테이션(Probe Station)의 미세 바늘들이 웨이퍼의 본딩 패드에 정밀 접촉하여 직류(DC) 전압, 교류(AC) 타이밍, 펑셔널(Functional) 기능 테스트를 수행하고 수율(Yield) 맵 데이터를 구축합니다.',
            inDepthEngineering: '불량 칩 중 일부 메모리 셀은 여분의 리던던시(Redundancy) 셀로 교체하는 레이저 리페어(Laser Repair) 공정을 통해 최종 수율을 대폭 개선합니다. 빅데이터 분석으로 특정 공정 설비의 이상 징후를 역추적합니다.',
            equipment: [
              { name: 'Ultra-Fine Probe Card Tester', maker: 'Advantest / Teradyne', purpose: '수천 채널 동시 고주파 전기 테스트' },
              { name: 'Laser Trimmer / Repair System', maker: 'Shibaura / ESI', purpose: '불량 셀 분리 및 리던던시 퓨즈 블로잉' }
            ],
            keyTechnologies: ['수율(Yield) 손실 원인 파레토 분석', 'Laser Fuse Repair', '고온/저온 번인(Burn-in) 스트레스 평가'],
            qualityControlFactors: [
              { item: 'EDS 최종 수율 (Prime Yield)', target: '> 90%', risk: '원가 상승 및 칩 단가 경쟁력 붕괴' },
              { item: '프로빙 콘택 저항 (Contact R)', target: '< 0.1 Ω', risk: '가짜 불량(Overkill) 및 핀 파손' }
            ],
            relatedJobs: [
              { title: '수율 분석(YE, Yield Enhancement) 엔지니어', requiredSkills: ['통계적 공정관리(SPC)', '전기회로 분석', 'Python/데이터 시각화'], description: '공정간 상관관계 분석 및 불량 패턴 머신러닝 분석' }
            ],
            interviewQuestions: [
              {
                question: 'EDS 공정의 수율 분석 데이터가 전공정(Fab) 피드백 루프에서 어떻게 활용되는지 설명해 보세요.',
                tip: 'Defect Density, 와플/링 패턴 등의 공간적 결함 분포와 파티클/설비 챔버 매핑을 연결하세요.',
                modelAnswer: 'EDS 테스트에서 생성된 웨이퍼 맵(Wafer Map)의 불량 패턴(예: 엣지형, 방사형, 특정 다이 반복형)을 이미지 클러스터링하여 전공정 파티클 검사(KLA) 데이터와 대조합니다. 특정 챔버나 밸브 이상 여부를 역추적하여 전공정 엔지니어에게 즉각 인터락(Interlock)을 걸어 대량 불량을 사전 차단하는 피드백 컨트롤의 핵심축입니다.'
              }
            ],
            verifiedStandard: true
          },
          {
            id: 'node-packaging',
            order: 8,
            name: '8. 첨단 패키징 및 HBM TSV 적층 (Advanced Packaging)',
            shortDesc: '웨이퍼를 개별 칩으로 절단하고 3D TSV 수직 적층 및 몰딩하여 열 방출과 고대역폭 데이터 통신 보장',
            detailedPrinciple: '백그라인딩(Backgrinding)으로 웨이퍼를 수십 마이크로미터 두께로 극박화한 후 마이크로 범프(Micro-bump) 및 실리콘 관통 전극(TSV)으로 8층~16층 D램 다이를 수직 적층하고 비전도성 필름(NCF) 또는 액상 에폭시 몰딩 언더필(MR-MUF)로 견고하게 패키징합니다.',
            inDepthEngineering: 'HBM4 시대에는 베이스 다이를 초미세 파운드리 공정으로 제작하며, 열 저항(Thermal Resistance)을 낮추기 위한 하이브리드 본딩(Cu-Cu 직접 접합) 기술이 게임 체인저로 도입되고 있습니다.',
            equipment: [
              { name: 'High-Precision Thermo-Compression Bonder', maker: '한미반도체 / ASMPT', purpose: '마이크론 단위 초정밀 열압착 TSV 다이 본딩' },
              { name: 'Chemical Mechanical Planarization for Hybrid Bonding', maker: 'Applied Materials', purpose: '하이브리드 Cu-Cu 본딩을 위한 극청정 평탄화' }
            ],
            keyTechnologies: ['3D TSV (Through Silicon Via)', 'Cu-Cu Hybrid Direct Bonding', 'MR-MUF / NCF 언더필 열 방출 구조'],
            qualityControlFactors: [
              { item: '패키지 휨 (Warpage)', target: '< 50 μm', risk: '보드 실장 불량 및 접합부 크랙 발생' },
              { item: 'TSV 접합 보이드 (Void Rate)', target: '0.0% 검출', risk: 'AI 연산 시 고온 국소 핫스팟 및 열폭주' }
            ],
            relatedJobs: [
              { title: '첨단 패키징(AVP) 개발 엔지니어', requiredSkills: ['기계열역학', '패키지 신뢰성 해석(ANSYS)', '고분자 유기소재'], description: 'HBM 방열 설계, 미세 피치 범프 본딩 공정 개발' }
            ],
            interviewQuestions: [
              {
                question: '최근 AI 시대에 패키징 기술이 단순한 보호 기능을 넘어 반도체 성능의 핵심 차별화 요소가 된 이유는 무엇인가요?',
                tip: '무어의 법칙 둔화, 메모리 월(Memory Wall), HBM의 고대역폭 요구, 이종 집적(Heterogeneous Integration)을 언급하세요.',
                modelAnswer: '전공정 미세화 한계와 비용 급증으로 인해 칩 간 신호 지연을 줄이는 2.5D/3D 패키징이 전면에 나섰습니다. 특히 생성형 AI는 방대한 연산량에 비해 메모리 대역폭이 병목이 되는 메모리 월(Memory Wall) 현상을 겪는데, TSV를 통해 수천 개의 I/O를 수직 연결한 HBM 및 인터포저 패키징이 칩 면적을 줄이고 대역폭을 비약적으로 끌어올리는 핵심 열쇠가 되었기 때문입니다.'
              }
            ],
            verifiedStandard: true
          }
        ]
      }
    ]
  },
  {
    id: 'lg-energy-solution',
    name: 'LG에너지솔루션',
    industry: '배터리',
    logoText: 'LGES',
    ticker: '373220.KS',
    headquarters: '서울특별시 영등포구 / 충북 오창 에너지플랜트',
    overview: '전기차(EV), ESS, IT 모빌리티용 리튬이온 배터리 셀 및 차세대 전고체/리튬황 배터리를 개발·양산하는 글로벌 탑티어 에너지 솔루션 기업입니다.',
    heroImage: '/src/assets/images/battery_cell_manufacturing_1793604988668.jpg',
    flagshipProducts: [
      {
        name: '하이니켈 NCMA 배터리 셀',
        description: '니켈 90% 이상 고용량에 알루미늄(Al)을 첨가해 열안정성을 확보한 프리미엄 EV용 파우치 배터리',
        marketPosition: '글로벌 완성차 메이저 공급'
      },
      {
        name: '원통형 4680 배터리',
        description: '지름 46mm, 높이 80mm의 탭리스(Tabless) 고에너지밀도 차세대 원통형 폼팩터',
        marketPosition: '차세대 전기차 표준 주도'
      }
    ],
    processFlows: [
      {
        productName: '차세대 리튬이온 배터리 셀 양산 라인',
        summary: '극판 제조(전극공정) → 셀 조립(조립공정) → 활성화(화성공정)의 3단계 완전 자동화 스마트팩토리',
        categoryNotice: '※ 본 공정도는 표준 전기화학 배터리 공학 이론 및 산업 표준 양산 프로세스를 바탕으로 구성되었습니다.',
        nodes: [
          {
            id: 'node-electrode',
            order: 1,
            name: '1. 전극 공정 (Electrode Manufacturing)',
            shortDesc: '양극재/음극재 슬러리를 제조하고 금속 집전체(Cu, Al)에 초정밀 코팅 및 롤프레싱, 슬리팅',
            detailedPrinciple: '활물질, 도전재, 바인더, 용매(NMP/물)를 교반기에서 균일하게 믹싱하여 슬러리를 만든 후 코터(Coater)를 통해 집전체 양면에 수십 마이크론 두께로 정밀 도포하고 건조로에서 용매를 휘발시킵니다. 이후 롤프레스 압연으로 전극 밀도를 높이고 규격 폭으로 슬리팅합니다.',
            inDepthEngineering: '슬러리의 유변학적(Rheology) 특성 제어와 롤프레싱 시 전극 두께 균일도 및 박리 강도(Adhesion) 확보가 셀 수명과 출력의 기초가 됩니다.',
            equipment: [
              { name: 'High-Speed Slot-Die Coater', maker: 'Toray / 국내 전문장비사', purpose: '양면 동시 초고속 초정밀 슬러리 코팅' },
              { name: 'Ultra-High Pressure Roll Press', maker: 'CIS / PNT', purpose: '선압(Line Pressure) 기반 전극 고밀도 압연' }
            ],
            keyTechnologies: ['양면 동시 슬롯다이 코팅', 'Roll-to-Roll 장력 제어', 'Dry Room 내 수분(< 10ppm) 제어'],
            qualityControlFactors: [
              { item: '로딩량 균일도 (Loading Level)', target: '±1.0% 이내', risk: '양/음극 N/P Ratio 불균형으로 덴드라이트(Dendrite) 형성 및 화재 위험' },
              { item: '전극 밀도 (Electrode Density)', target: '양극 3.4g/cc 이상', risk: '에너지 밀도 감소 또는 전해액 함침 불량' }
            ],
            relatedJobs: [
              { title: '배터리 전극 공정기술 엔지니어', requiredSkills: ['화학공학', '유체역학', '슬러리 분산도 분석'], description: '코팅 속도 향상, 건조 구간 온도 프로파일 튜닝' }
            ],
            interviewQuestions: [
              {
                question: '전극 공정에서 N/P Ratio(음극 용량 대비 양극 용량 비)가 1보다 커지면 발생하는 심각한 안전성 문제는 무엇인가요?',
                tip: '리튬 석출(Lithium Plating)과 덴드라이트 형성, 분리막 관통 쇼트 메커니즘을 설명하세요.',
                modelAnswer: 'N/P Ratio가 1 이하(음극 용량 부족)로 떨어지면 충전 시 양극에서 방출된 리튬 이온을 음극 흑연 층간에서 다 수용하지 못해 음극 표면에 금속 리튬이 덴드라이트 형태로 석출됩니다. 이는 전해액을 소모시키고 분리막을 찢어 내부 단락(Short) 및 열폭주(Thermal Runaway)를 유발하므로 항상 N/P Ratio를 1.05~1.15 이상으로 엄격히 관리해야 합니다.'
              }
            ],
            verifiedStandard: true
          },
          {
            id: 'node-assembly',
            order: 2,
            name: '2. 조립 공정 (Cell Assembly)',
            shortDesc: '노칭된 양극/음극/분리막을 지그재그로 스태킹(Stacking)하고 탭 용접 후 파우치/캔에 밀봉 및 전해액 주액',
            detailedPrinciple: '극판을 일정한 크기로 따내는 노칭(Notching) 후, 분리막 사이에 양극과 음극을 교대로 쌓는 라미네이션 & 스태킹(Lamination & Stacking)을 진행합니다. 탭(Tab) 초음파/레이저 용접 후 알루미늄 파우치나 캔에 삽입하고 진공 상태에서 전해액을 주액한 뒤 밀봉합니다.',
            inDepthEngineering: '과거 와인딩(Winding) 방식의 단점인 모서리 스트레스 및 변형을 개선하기 위해 어드밴스드 Z-스태킹 공법을 적용하여 열화 방지 및 공간 활용도를 극대화합니다.',
            equipment: [
              { name: 'High-Precision Laser Notcher', maker: '디이엔티 / 하나기술', purpose: '버(Burr) 없는 고속 레이저 극판 절단' },
              { name: 'Advanced Z-Stacking Machine', maker: '신흥에스이씨 / 엠플러스', purpose: '극판과 분리막 초고속 정렬 적층' }
            ],
            keyTechnologies: ['버(Burr < 5μm) 최소화 레이저 가공', 'Z-스태킹 고속 정렬', '진공 전해액 디가싱 함침 기술'],
            qualityControlFactors: [
              { item: '전극 정렬 오차 (Misalignment)', target: '< 0.3 mm', risk: '양/음극 대면 불량으로 국소 리튬 석출' },
              { item: '전해액 함침도 (Wetting Ratio)', target: '100% 완전 함침', risk: '미함침 부위 저항 급증 및 용량 미달' }
            ],
            relatedJobs: [
              { title: '배터리 셀 조립/설비기술 엔지니어', requiredSkills: ['기계공학', '레이저 가공', '비전 검사(Machine Vision)'], description: '스태킹 고속화 틱타임(Tact Time) 단축 및 용접 결함 제어' }
            ],
            interviewQuestions: [
              {
                question: '배터리 극판 노칭 시 프레스(칼날) 방식 대비 레이저 노칭이 갖는 기술적 우위를 설명해 보세요.',
                tip: '칼날 마모에 따른 버(Burr) 발생 억제, 유지보수 비용, 모델 체인지 유연성을 비교하세요.',
                modelAnswer: '프레스 금형 방식은 연속 타발에 따른 칼날 마모로 금속 버(Burr)가 발생하여 분리막 손상 위험이 높고 금형 교체 비용이 큽니다. 반면 레이저 노칭은 비접촉식이므로 버를 5μm 이하로 억제해 내부 단락 위험을 원천 차단하며, 소프트웨어 제어로 패턴 형상을 자유롭게 바꿔 다양한 모델에 신속하게 대응할 수 있습니다.'
              }
            ],
            verifiedStandard: true
          },
          {
            id: 'node-formation',
            order: 3,
            name: '3. 화성 공정 (Formation & Aging)',
            shortDesc: '전기화학적 첫 충방전을 가하여 SEI 피막을 형성하고 고온/상온 에이징을 거쳐 셀 성능과 등급 선별',
            detailedPrinciple: '조립이 끝난 전지 셀에 정밀 전류와 전압을 인가하여 최초 충전을 수행합니다. 이 과정에서 음극 표면에 안정적인 고체 전해질 계면(SEI, Solid Electrolyte Interphase) 피막이 생성됩니다. 충방전 시 발생하는 가스를 배출(Degassing)하고 에이징 룸에서 전압 강하량(OCV)을 측정해 미세 쇼트 셀을 전수 불량 검출합니다.',
            inDepthEngineering: 'SEI 피막의 균일성과 조성(LiF, Li2CO3 등)이 10년 이상의 배터리 장기 사이클 수명을 좌우하므로 다단계 정밀 충전 전류 프로파일 및 온도 제어가 필수적입니다.',
            equipment: [
              { name: 'Automated Formation Cycler', maker: '원익피앤이 / 에이프로', purpose: '채널별 정밀 충방전 및 전력 회생' },
              { name: 'Vacuum Degasser & Sealer', maker: '갑진 / 피엔티', purpose: '파우치 내부 발생 가스 흡입 및 재밀봉' }
            ],
            keyTechnologies: ['SEI 피막 안정화 충전 알고리즘', '정밀 OCV(개방회로전압) 불량 스크리닝', 'DC-IR(직류 내부저항) 등급 분류'],
            qualityControlFactors: [
              { item: 'K-value (시간당 전압 강하율)', target: '< 0.05 mV/day', risk: '미세 내부 단락으로 인한 자가방전 및 화재 위험' },
              { item: '가스 배출 후 잔류 두께', target: '스펙 공차 ±0.05mm', risk: '모듈 조립 시 셀 팽창(Swelling) 문제' }
            ],
            relatedJobs: [
              { title: '배터리 평가/화성 공정기술 엔지니어', requiredSkills: ['전기화학 임피던스(EIS)', '데이터 통계학', '배터리 수명 분석'], description: '화성 충전 프로파일 단축 및 미세 단락 알고리즘 개선' }
            ],
            interviewQuestions: [
              {
                question: '화성 공정에서 형성되는 SEI(Solid Electrolyte Interphase) 피막의 역할과 좋은 SEI 피막의 조건은 무엇인가요?',
                tip: '리튬 이온 투과성, 전자 절연성, 기계적 유연성, 전해액 추가 분해 억제를 설명하세요.',
                modelAnswer: 'SEI 피막은 초기 충전 시 음극과 전해액의 환원 반응으로 형성되는 부동태 피막입니다. 전해액 분자가 음극으로 더 이상 침투해 지속적으로 분해되는 것을 막아주면서도, 리튬 이온만을 선택적으로 원활히 투과시키는 역할을 합니다. 좋은 SEI 피막은 전자를 통과시키지 않는 전자 절연성이 높고, 얇고 치밀하며, 충방전 시 전극 팽창/수축에도 깨지지 않는 기계적 안정성을 갖춰야 합니다.'
              }
            ],
            verifiedStandard: true
          }
        ]
      }
    ]
  },
  {
    id: 'hyundai-motor',
    name: '현대자동차',
    industry: '자동차',
    logoText: 'HMC',
    ticker: '005380.KS',
    headquarters: '서울특별시 서초구 양재동 / 울산·남양·아산·화성 스마트공장',
    overview: '전기차 전용 플랫폼 E-GMP 기반의 아이오닉 시리즈, 수소전기차, 자율주행 및 SDV(소프트웨어 중심 자동차) 모빌리티를 선도하는 글로벌 Top 3 완성차 기업입니다.',
    heroImage: '/src/assets/images/automotive_ev_assembly_1793604990130.jpg',
    flagshipProducts: [
      {
        name: '아이오닉 5 / 6 / 9 (E-GMP 플랫폼)',
        description: '800V 초급속 충전 시스템 및 V2L 기술이 탑재된 글로벌 수상 전기차 라인업',
        marketPosition: '글로벌 EV 시장 최상위권'
      },
      {
        name: '차세대 SDV 전장 아키텍처',
        description: '도메인/존(Zone) 제어기 기반의 무선(OTA) 소프트웨어 업데이트 지원 플랫폼',
        marketPosition: '커넥티드 모빌리티 혁신'
      }
    ],
    processFlows: [
      {
        productName: 'E-GMP 전기차 스마트 제조 공정',
        summary: '프레스 → 차체 용접 → 도장 → 의장 조립 → PE/배터리 통합 및 최종 주행 안전 검사',
        categoryNotice: '※ 본 공정도는 글로벌 완성차 표준 5대 공정과 전기차 전용 스마트 제조 자동화 설비를 기반으로 정리되었습니다.',
        nodes: [
          {
            id: 'node-stamping',
            order: 1,
            name: '1. 프레스 공정 (Stamping)',
            shortDesc: '고장력 강판 및 알루미늄 판재를 거대한 금형 프레스로 압축 성형하여 차량 외판 및 골격 패널 제작',
            detailedPrinciple: '코일 형태의 강판을 풀어 세척하고 절단(Blanking)한 뒤 수천 톤 규모의 트랜스퍼 프레스 라인에서 드로잉(Drawing) → 트리밍(Trimming) → 플랜징(Flanging)을 거쳐 3차원 바디 패널을 성형합니다.',
            inDepthEngineering: '차량 경량화와 충돌 안전성을 위해 1500MPa급 핫스탬핑(Hot Stamping) 공법을 도입하여 초고강도 부품을 고온 가열 후 금형 내에서 급냉 성형합니다.',
            equipment: [
              { name: '5,400-ton Servo Transfer Press', maker: '현대로템 / Schuler', purpose: '서보 모터 제어 고정밀 고속 패널 타발' },
              { name: 'Hot Stamping Furnace Line', maker: '신한포스텍 / AP&T', purpose: '950℃ 가열 후 마르텐사이트 변태 유도' }
            ],
            keyTechnologies: ['핫스탬핑(Hot Stamping) 열간성형', '스프링백(Springback) 보정 해석', '알루미늄 패널 복합 성형'],
            qualityControlFactors: [
              { item: '패널 치수 정밀도', target: '±0.5 mm 이내', risk: '차체 용접 시 단차(Gap) 및 조립 불량' },
              { item: '크랙 및 넥킹(Necking) 결함', target: '0건', risk: '차량 충돌 안전 등급 하락' }
            ],
            relatedJobs: [
              { title: '프레스 생산기술/금형 엔지니어', requiredSkills: ['소성가공학', '금형 설계(CATIA)', '성형 해석(AutoForm)'], description: '프레스 성형 해석 및 금형 마모 관리' }
            ],
            interviewQuestions: [
              {
                question: '전기차에서 핫스탬핑(Hot Stamping) 부품 적용이 급격히 증가하는 구조적 원인을 설명해 보세요.',
                tip: '무거운 배터리 팩 무게, 충돌 시 배터리 보호, 차체 경량화 및 마르텐사이트 조직 특성을 언급하세요.',
                modelAnswer: '전기차는 수백 킬로그램의 고전압 배터리를 하부에 탑재하여 내연기관 대비 공차중량이 20~30% 무겁습니다. 측면 충돌 시 배터리 팩 손상으로 인한 화재를 막으려면 캐빈룸 및 B필러 부위의 변형을 극소화해야 하므로, 1500MPa 이상의 초고강도와 가벼운 중량을 동시에 구현하는 핫스탬핑 공법 적용이 필수적입니다.'
              }
            ],
            verifiedStandard: true
          },
          {
            id: 'node-body',
            order: 2,
            name: '2. 차체 공정 (Body Welding)',
            shortDesc: '프레스된 수백 개의 패널을 수백 대의 산업용 로봇이 스폿 용접, 레이저 용접, 구조용 접착제로 결합',
            detailedPrinciple: '인더스트리 4.0 기반의 완전 자동화 라인에서 관절 로봇이 패널을 파지하고 스폿 용접(Spot Welding), 레이저 브레이징(Laser Brazing), 스프루(SPR, Self-Piercing Rivet)를 통해 하나의 차체(BIW, Body in White) 골격을 완성합니다.',
            inDepthEngineering: '이종 재질(스틸 + 알루미늄) 접합 시 갈바닉 부식을 방지하기 위해 구조용 접착제(Structural Adhesive)와 SPR 복합 접합 기술을 구사합니다.',
            equipment: [
              { name: 'Articulated Welding Robot', maker: '현대로보틱스 / KUKA / FANUC', purpose: '스폿 용접 및 정밀 실링제 도포' },
              { name: 'In-line 3D Optical Scanner', maker: 'GOM / Hexagon', purpose: '차체 주요 200여 개 포인트 실시간 치수 전수 검사' }
            ],
            keyTechnologies: ['이종소재(Steel-Al) 복합 접합(SPR)', '레이저 스크류 용접', '구조용 접착제 강성 증대'],
            qualityControlFactors: [
              { item: 'BIW 차체 치수 적합률 (Cpk > 1.67)', target: '주요 갭단차 ±1.0mm', risk: '도어 닫힘 불량, 풍절음 발생 및 누수' },
              { item: '용접 너깃(Nugget) 직경', target: '5√t 이상', risk: '충돌 시 용접부 박리 및 안전 취약' }
            ],
            relatedJobs: [
              { title: '차체 공정설계 및 자동화 로봇 엔지니어', requiredSkills: ['용접야금학', '산업용 로봇 오프라인 티칭(Delmia)', '공차해석'], description: '로봇 용접 경로 최적화 및 레이아웃 설계' }
            ],
            interviewQuestions: [
              {
                question: '전기차 차체 설계에서 철강과 알루미늄을 접합할 때 일반 용접 대신 SPR(Self-Piercing Rivet)과 구조용 접착제를 쓰는 이유는 무엇인가요?',
                tip: '용융점 차이(1500℃ vs 660℃)로 인한 금속간 화합물 취성과 갈바닉 부식을 짚으세요.',
                modelAnswer: '철과 알루미늄은 녹는점 차이가 크고 금속간 취성 화합물(Intermetallic Compound)이 생성되어 전통적 용융 용접이 불가능합니다. 또한 두 금속 간 전위차로 인한 갈바닉 부식이 발생합니다. 따라서 비열적 기계적 체결인 SPR을 적용하고, 접촉면에 절연 역할을 하는 고강도 구조용 접착제를 도포하여 부식을 방지하면서 차체 비틀림 강성을 대폭 강화합니다.'
              }
            ],
            verifiedStandard: true
          },
          {
            id: 'node-assembly-ev',
            order: 3,
            name: '3. 의장 및 PE/배터리 모듈 통합 (Final Assembly & PE Integration)',
            shortDesc: '도장된 차체 내외부에 배선, 시트, 전장 모듈을 장착하고 하부에 E-GMP 고전압 배터리 팩 및 구동모터 체결',
            detailedPrinciple: '도장 공정을 거친 차체에 와이어링 하네스, 칵핏 모듈, 인포테인먼트를 장착한 후, 무인운반차(AGV)를 통해 하부에서 올라온 고전압 배터리 시스템(BSA)과 PE(Power Electric) 시스템(모터+인버터+감속기)을 멀티 너트러너로 정밀 볼팅 체결합니다.',
            inDepthEngineering: '800V 고전압 안전을 위한 절연 저항 검사, 초정밀 토크-앵글(Torque-Angle) 데이터 로깅, 무선 ADAS 캘리브레이션이 결합됩니다.',
            equipment: [
              { name: 'Multi-Spindle DC Nutrunner', maker: 'Atlas Copco / Bosch Rexroth', purpose: '배터리 팩 수십 개 볼트 동시 토크 체결 및 이력 관리' },
              { name: 'Autonomous Guided Vehicles (AGV)', maker: '현대위아 / 무인로봇', purpose: '무인 자율 부품 이송 및 모듈 샤시 도킹' }
            ],
            keyTechnologies: ['Torque-Angle 체결 데이터 추적성', '고전압 절연 안전(Hi-Pot) 검사', 'ADAS 카메라 및 라이다 레이더 타겟 보정'],
            qualityControlFactors: [
              { item: '체결 토크 적합률', target: '100% Cpk > 2.0', risk: '배터리 팩 체결 볼트 풀림 및 수분 유입' },
              { item: '고전압 절연 저항', target: '> 500 MΩ (DC 1000V 인가)', risk: '감전 및 차체 누전 안전사고' }
            ],
            relatedJobs: [
              { title: '의장/전장 생산기술 엔지니어', requiredSkills: ['전기전자공학', 'PLC 제어', '품질경영(Six Sigma)', '스마트팩토리 MES'], description: '라인 밸런싱(Line Balancing) 및 고전압 공정 안전 최적화' }
            ],
            interviewQuestions: [
              {
                question: '전기차 최종 조립 라인에서 내연기관 라인과 가장 크게 구별되는 안전 및 품질 검사 항목은 무엇인가요?',
                tip: '고전압(400V/800V) 감전 안전 시스템, 절연 저항(Hi-Pot), 배터리 팩 냉각수 리크 테스트를 설명하세요.',
                modelAnswer: '내연기관의 연료 누유 및 엔진 체결과 달리, 전기차 라인은 800V급 고전압 배터리와 인버터가 탑재되므로 작업자 감전 방지를 위한 인터록 및 고전압 절연(Hi-Pot) 검사가 필수적입니다. 또한 배터리 셀 냉각을 위한 쿨런트 배관의 헬륨 리크(Leak) 기밀 시험, 모터 회전 시의 진동 및 인버터 스위칭 노이즈(NVH) 계측이 핵심 검사 항목으로 추가됩니다.'
              }
            ],
            verifiedStandard: true
          }
        ]
      }
    ]
  },
  {
    id: 'samsung-biologics',
    name: '삼성바이오로직스',
    industry: '바이오',
    logoText: 'SBL',
    ticker: '207940.KS',
    headquarters: '인천광역시 연수구 송도국제도시 바이오캠퍼스',
    overview: '세계 1위 생산 캐파(Capacity)를 보유한 초대형 바이오의약품 위탁개발생산(CDMO) 기업으로 단클론항체, ADC(항체약물접합체), 메신저RNA 의약품을 생산합니다.',
    heroImage: '/src/assets/images/biologics_cleanroom_bioreactor_1793604990226.jpg',
    flagshipProducts: [
      {
        name: '단클론항체(mAb) 바이오의약품 원료(DS) & 완제(DP)',
        description: '글로벌 제약사 표적 항암제, 자가면역질환 치료제 대량 세포배양 및 무균 충전',
        marketPosition: '글로벌 바이오의약품 CDMO 생산량 세계 1위'
      },
      {
        name: '차세대 ADC (항체-약물 접합체)',
        description: '표적 항체에 강력한 세포독성 약물을 링커로 결합한 차세대 항암제',
        marketPosition: '전용 생산 팹 가동 및 신성장 동력'
      }
    ],
    processFlows: [
      {
        productName: '단클론항체 바이오의약품 대규모 cGMP 생산 공정',
        summary: '세포주 해동(Cell Thawing) → 업스트림(배양) → 다운스트림(정제) → 완제의약품(DP) 무균 충전',
        categoryNotice: '※ 본 공정도는 미국 FDA 및 유럽 EMA cGMP 규정에 부합하는 표준 바이오의약품 상업 생산 프로세스입니다.',
        nodes: [
          {
            id: 'node-upstream',
            order: 1,
            name: '1. 업스트림 배양 공정 (Upstream Processing)',
            shortDesc: '동결 보존된 CHO(중국 햄스터 난소) 세포주를 플라스크에서 계대 배양 후 15,000L 대형 생물반응기에서 목적 단백질 발현',
            detailedPrinciple: 'Working Cell Bank 바이알을 무균적으로 해동하여 스핀 플라스크와 시드 바이오리액터(Seed Bioreactor)를 거쳐 10,000~15,000L 생산용 대형 스테인리스 바이오리액터로 점진 스케일업합니다. 유가배양(Fed-batch) 방식으로 용존산소(DO), pH, 온도, 포도당 농도를 실시간 자동 제어합니다.',
            inDepthEngineering: '스케일업 시 전단 응력(Shear Stress)에 의한 세포 파괴를 줄이기 위해 임펠러(Impeller) 형태와 교반 속도(Tip Speed), 스파저(Sparger)의 마이크로 기포 크기를 최적화합니다.',
            equipment: [
              { name: '15,000L Stainless Steel Bioreactor', maker: 'Cytiva / Sartorius', purpose: '항체 대량 발현을 위한 자동화 대규모 생물반응기' },
              { name: 'Biochemical Analyzer (Nova BioProfile)', maker: 'Nova Biomedical', purpose: '포도당, 젖산, 글루타민, 세포 생존율(Viability) 실시간 분석' }
            ],
            keyTechnologies: ['스케일업 유체역학(CFD) 교반 해석', 'DoE(실험계획법) 배지 최적화', 'Process Analytical Technology (PAT)'],
            qualityControlFactors: [
              { item: '생존 세포 밀도(VCD) 및 생존율(Viability)', target: 'VCD > 15×10⁶ cells/mL, Viability > 90%', risk: '세포 괴사 시 세포내 불순물(HCP, HCD) 방출로 정제 부하 가중' },
              { item: '무균성(Sterility)', target: '오염 0건 (박테리아, 미코플라즈마 등)', risk: '배양액 전량 폐기 및 수백억 손실' }
            ],
            relatedJobs: [
              { title: '배양(Upstream) 공정개발/생산 엔지니어', requiredSkills: ['미생물학/생물공학', '세포 대사(Metabolism)', '생물공정 스케일업'], description: '배지 영양소 피딩 전략 수립, 배양기 파라미터 제어' }
            ],
            interviewQuestions: [
              {
                question: '바이오리액터를 연구실(5L)에서 상업용(15,000L)으로 스케일업할 때 고려해야 하는 유체역학적 핵심 인자는 무엇인가요?',
                tip: '산소전달계수(kLa), 교반 전단력(Shear Stress), 혼합 시간(Mixing Time), P/V(단위부피당 교반동력)를 비교하세요.',
                modelAnswer: '부피가 3,000배 커지면 기하학적 유사성만으로는 동일한 배양 환경을 만들 수 없습니다. 대형 탱크에서는 혼합 시간이 길어져 pH와 영양소 불균일(구배)이 생기며, 산소를 충분히 공급하기 위해 교반 속도를 올리면 임펠러 팁의 전단 응력(Shear Stress)으로 세포벽이 파괴됩니다. 따라서 단위부피당 동력(P/V)이나 산소전달계수(kLa)를 기준 상수로 삼고 CFD 시뮬레이션을 통해 임펠러 형상과 통기(Sparging) 방식을 조정해야 합니다.'
              }
            ],
            verifiedStandard: true
          },
          {
            id: 'node-downstream',
            order: 2,
            name: '2. 다운스트림 정제 공정 (Downstream Processing)',
            shortDesc: '배양액에서 세포 잔해를 분리하고 Protein A 크로마토그래피 및 바이러스 불활화/여과로 99.9% 순도 의약품 정제',
            detailedPrinciple: '원심분리 및 심층 여과(Depth Filtration)로 세포 찌꺼기를 제거한 후, 단클론항체의 Fc 영역에 특이적으로 결합하는 Protein A 친화성 크로마토그래피로 1차 고순도 포획(Capture)을 진행합니다. 이어 저pH 바이러스 불활화, 음이온/양이온 교환 크로마토그래피(AEX/CEX), 20nm 나노 바이러스 필터 여과, UF/DF를 거쳐 원료의약품(DS)을 조제합니다.',
            inDepthEngineering: '숙주세포 단백질(HCP), 숙주세포 DNA(HCD), 고분자 응집체(Aggregate)를 ppm 단위 이하로 완벽히 제거해야 인체 투여 시 면역 거부 반응을 막을 수 있습니다.',
            equipment: [
              { name: 'Automated Chromatography Skid', maker: 'Cytiva (ÄKTA process)', purpose: '친화성 및 이온교환 컬럼 자동화 정제' },
              { name: 'Tangential Flow Filtration (TFF/UFDF)', maker: 'Millipore Sigma / Sartorius', purpose: '항체 한외여과 농축 및 완충액 치환' }
            ],
            keyTechnologies: ['Protein A 레진 수명 최적화', '나노 바이러스 필터레이션 (Viral Clearance > 4 log)', '한외여과 농축 제어'],
            qualityControlFactors: [
              { item: '단백질 단량체 순도(Monomer Purity)', target: '> 98.5% (SEC-HPLC 측정)', risk: '응집체(Aggregate) 존재 시 환자 아나필락시스 쇼크 유발' },
              { item: '잔류 숙주세포 단백질(HCP)', target: '< 10 ppm (ELISA 측정)', risk: '면역원성 유발 및 의약품 승인 거절' }
            ],
            relatedJobs: [
              { title: '정제(Downstream) 공정기술 엔지니어', requiredSkills: ['단백질화학', '분리공정(Chromatography)', 'HPLC/전기영동 분석'], description: '크로마토그래피 수율 극대화 및 바이러스 제거 밸리데이션' }
            ],
            interviewQuestions: [
              {
                question: '항체 정제 공정에서 Protein A 크로마토그래피 이후 저pH(Low pH) 바이러스 불활화 공정을 거치는 이유와 주의점을 설명하세요.',
                tip: '외피보유(Enveloped) 바이러스 불활화 기작과 단백질 변성/응집 위험 방지를 설명하세요.',
                modelAnswer: '포유류 세포 배양 특성상 레트로바이러스 등 잠재적 바이러스 위험이 존재합니다. 용출된 항체 용액을 pH 3.5~3.8 수준으로 낮춰 일정 시간 유지하면 외피를 가진 바이러스의 지질막 단백질이 변성되어 감염력을 상실합니다. 이때 주의점은 노출 시간이 너무 길거나 pH가 지나치게 낮으면 목적 항체 단백질도 부분 변성되거나 비가역적 응집체(Aggregate)가 형성될 수 있으므로 정확한 산/염기 투입과 중화 타이밍을 엄격히 제어해야 합니다.'
              }
            ],
            verifiedStandard: true
          }
        ]
      }
    ]
  }
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'semi-process-01',
    industry: '반도체',
    jobRole: '공정기술 엔지니어',
    title: '반도체 8대 공정 완전 정복 및 수율 향상 메커니즘',
    estimatedMinutes: 25,
    difficulty: '중급',
    summary: '웨이퍼 제조부터 패키징까지 8대 핵심 공정의 유기적 연결 고리와 각 단계별 불량 원인 및 엔지니어링 대처법을 학습합니다.',
    coreConcepts: {
      simpleExplanation: '반도체 8대 공정은 도화지를 만들고(웨이퍼), 밑바탕 칠을 하고(산화), 사진을 찍어 밑그림을 그린 뒤(노광), 불필요한 부분을 깎아내고(식각), 필요한 재료를 얇게 덮고(증착), 전기를 통하게 만든 다음(이온주입), 길을 연결하고(금속배선), 마지막으로 제대로 작동하는지 검사해 포장하는(EDS & 패키징) 일련의 나노 빌딩 짓기 과정입니다.',
      deepExplanation: '각 단위 공정은 독립적이지 않고 누적된 열예산(Thermal Budget), 표면 응력(Stress), 파티클 오염이 복합 작용합니다. 서브 3나노에서는 EUV의 스토캐스틱 결함, ALD의 원자층 균일도, 플라즈마 챔버의 전극 침식 등이 종합 수율(Yield = Die per Wafer × Probe Yield × Assembly Yield)을 결정짓는 극한의 나노스케일 통계 제어 학문입니다.',
      keyFormulasOrSchematics: 'Yield Model: Y = Y0 × (1 + D0 × A / α)^(-α) (Negative Binomial Model, D0=결함밀도, A=칩면적)'
    },
    industrialApplicationCase: {
      title: '3D V-NAND 200단 이상 식각 시 HARC(초고종횡비) 틸팅 불량 해결',
      companyContext: '메모리 반도체 양산 라인에서 200단 수직 채널 홀(Channel Hole)을 한 번에 뚫는 에칭 공정 적용',
      problem: '종횡비가 60:1을 초과하면서 플라즈마 이온이 하부로 갈수록 측벽에 충돌하여 식각 구멍이 휘어지는 틸팅(Tilting) 및 상부 핀치오프 발생',
      solution: '챔버 온도를 영하 -60℃ 이하로 냉각하는 극저온(Cryogenic) 식각 기술 도입 및 불소계/탄화수소 가스 비율 튜닝으로 측벽 보호막 강화',
      outcome: '수직 프로파일 직진도 89.8° 달성 및 채널 홀 개구 불량률 94% 감소, 웨이퍼 수율 12%p 개선'
    },
    glossary: [
      { term: 'Critical Dimension (CD)', definition: '회로 패턴의 최소 선폭 또는 패턴 크기', importance: '소자 동작 속도 및 집적도 직결' },
      { term: 'Selectivity (식각 선택비)', definition: '식각 대상 막질의 식각 속도 / 마스크층의 식각 속도 비율', importance: '하부 층 손상 없이 원하는 막만 정확히 제거' },
      { term: 'Step Coverage', definition: '단차 부위에서 수직 측벽 두께 / 평탄면 두께의 백분율', importance: '트렌치 내부 보이드(빈 공간) 발생 방지' },
      { term: 'Thermal Budget (열예산)', definition: '공정 중 웨이퍼가 받는 총 열에너지의 총합 (온도 × 시간 적분값)', importance: '과도한 열에너지는 도핑 불순물의 원치 않는 확산 유발' }
    ],
    interviewPrep: [
      {
        question: '공정기술 엔지니어로서 수율이 갑자기 5% 하락했을 때, 어떻게 원인을 추적하고 대처하시겠습니까?',
        intent: '데이터 기반 문제 해결 능력, 전공정 역추적 논리, 협업 태도 평가',
        starGuide: {
          situation: '특정 로트(Lot)에서 특정 검사 항목(EDS 수율)이 5% 급락한 상황 인지',
          task: '문제 발생 장비 및 단위 공정의 인과관계를 신속히 규명하여 추가 로트 투입 중단 및 손실 방지',
          action: '1) 웨이퍼 맵의 결함 패턴(웨이퍼 중심부/주변부 여부) 확인, 2) 장비 추적 데이터(MES) 대조로 공통으로 거쳐간 특정 챔버(Chamber Commonality) 도출, 3) 해당 챔버의 OES 센서 및 RF 파워 로그 분석, 4) 긴급 PM(예방보전) 및 더미 웨이퍼 테스트 진행',
          result: '식각 챔버의 가스 분사 노즐 편마모 확인 및 교체 후, 24시간 내 수율 정상화 및 재발 방지 파라미터 셋업'
        },
        modelAnswer: '수율이 급락하면 먼저 감정에 휩쓸리지 않고 데이터를 봅니다. 첫째, EDS 웨이퍼 맵의 불량 분포 형상을 분석하여 무작위 파티클인지, 회전형 설비 문제인지 형태학적으로 분류합니다. 둘째, MES 생산 이력을 교차 분석하여 불량 웨이퍼들이 공통으로 통과한 특정 설비나 챔버를 좁혀냅니다. 셋째, 해당 설비의 진공도, RF 정합기(Matcher), 가스 유량 센서 로그를 확인하고 즉시 인터록을 설정한 뒤 단위 공정 엔지니어 및 설비팀과 합동 점검을 수행하여 근본 원인을 제거하겠습니다.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: '다음 중 박막 증착 공정에서 단차 피복성(Step Coverage)이 가장 우수하여 고종횡비 트렌치에 100% 균일한 박막을 형성하는 방식은?',
        options: ['Thermal PVD (열 증발법)', 'Sputtering (스퍼터링)', 'Atmospheric CVD (대기압 화학기상증착)', 'Atomic Layer Deposition (원자층 증착법)'],
        correctIndex: 3,
        explanation: 'ALD는 원자층 단위의 자기제한 표면포화 흡착(Self-limiting) 반응을 이용하므로 복잡한 3차원 깊은 홀에서도 100%에 가까운 스텝 커버리지를 제공합니다.'
      },
      {
        id: 'q2',
        question: '노광 공정에서 해상도(Resolution R)를 개선하여 더 미세한 회로를 그리기 위한 방법으로 올바르지 않은 것은?',
        options: ['노광 광원의 파장(λ)을 짧게 한다 (예: DUV -> EUV)', '광학 렌즈의 개구수(NA)를 키운다', '공정 상수(k1) 값을 최대로 높인다', '광학 근접 보정(OPC) 및 고성능 감광액(PR)을 적용한다'],
        correctIndex: 2,
        explanation: '레일리 공식 R = k1 * (λ / NA)에서 R(해상도 한계값)이 작을수록 미세화가 가능하므로, k1(공정상수)은 줄여야(낮춰야) 합니다.'
      }
    ]
  },
  {
    id: 'battery-dev-01',
    industry: '배터리',
    jobRole: '배터리 셀 개발 및 공정 엔지니어',
    title: '리튬이온 배터리 전기화학 원리와 열폭주(Thermal Runaway) 억제 기술',
    estimatedMinutes: 20,
    difficulty: '중급',
    summary: '양극, 음극, 전해액, 분리막의 4대 요소 작동 기작과 화재 안전성을 결정짓는 열폭주 단계별 방어 전략을 학습합니다.',
    coreConcepts: {
      simpleExplanation: '배터리는 충전할 때 리튬 이온이 양극에서 나와 음극으로 들어가 숨어 있다가, 방전할 때 다시 양극으로 돌아가며 도선을 통해 전자를 밀어내 전기를 만드는 셔틀 구조입니다. 이 과정에서 발생하는 열을 제어하지 못하면 분리막이 녹아 큰 화재로 이어집니다.',
      deepExplanation: '하이니켈 양극재(Ni > 80%)는 높은 방전 용량을 주지만 충전 상태에서 Ni4+ 이온의 강한 산화력으로 인해 산소 탈리(O2 release) 온도가 낮아집니다. 음극 SEI 분해(80~120℃) → 분리막 용융(130~170℃) → 양극 산소 방출 및 전해액 연소(200℃ 이상)로 이어지는 연쇄 발열 반응을 화학적/구조적으로 차단해야 합니다.',
      keyFormulasOrSchematics: '배터리 발열 방정식: Q = I²R_ohm (줄열) + I·T·(∂E/∂T) (가역 엔트로피열) + Q_chem (부반응 분해열)'
    },
    industrialApplicationCase: {
      title: '하이니켈 NCMA 양극재 알루미늄 도핑을 통한 결정 구조 안정화',
      companyContext: '글로벌 EV용 600km 이상 주행거리 확보를 위한 하이니켈 셀 개발 프로젝트',
      problem: '니켈 비중 85% 이상 시 반복된 충방전 중 상전이(H2 -> H3)로 인해 입자 내부 마이크로 크랙이 발생하여 가스 발생 및 수명 급락',
      solution: '입자 내부에 Al(알루미늄) 원자를 균일 도핑하여 결합 에너지를 높이고 입자 표면을 산화코발트/지르코늄으로 나노 코팅',
      outcome: '1,000 사이클 후 용량 유지율 78% → 89% 향상, 산소 탈리 개시 온도 25℃ 상향으로 안전성 입증'
    },
    glossary: [
      { term: 'Solid Electrolyte Interphase (SEI)', definition: '음극 표면에 전해액이 환원되어 형성되는 전자 절연성/이온 전도성 부동태 피막', importance: '셀 수명 및 쿨롱 효율 결정' },
      { term: 'Thermal Runaway (열폭주)', definition: '내부 단락이나 과열로 발열 속도가 방열 속도를 초과하여 수초 내 수백 도까지 치솟는 제어 불능 현상', importance: '전기차 화재 안전 설계의 핵심 타겟' },
      { term: 'N/P Ratio', definition: '음극 코팅 용량(mAh/cm²)을 양극 코팅 용량으로 나눈 비율', importance: '리튬 덴드라이트 석출 방지를 위해 1.05~1.15로 관리' }
    ],
    interviewPrep: [
      {
        question: '배터리의 에너지 밀도를 높이기 위해 하이니켈 양극재를 사용할 때 안전성 관점에서 희생되는 부분과 이를 극복하는 엔지니어링 방안을 설명하세요.',
        intent: '재료 화학적 이해도와 트레이드오프 해결 역량 점검',
        starGuide: {
          situation: '에너지 밀도 향상을 위해 니켈 함량을 90%까지 극대화하는 요구',
          task: '니켈 증가에 따른 열안정성 저하와 가스 팽창(Swelling) 문제를 동시에 해결',
          action: '단결정(Single-crystal) 양극재 적용으로 비표면적을 줄여 가스 발생을 억제하고, Al 도핑 및 세라믹 코팅 분리막(CCS) 적용',
          result: '고용량 구현과 동시에 모듈 단위 열전이 방지 안전 시험 통과'
        },
        modelAnswer: '하이니켈 양극재는 니켈 함량이 늘어날수록 결정 구조 내 전하 중성을 맞추기 위해 불안정한 Ni4+ 비중이 높아져 열분해 온도가 낮아지고 반응성 산소를 방출하기 쉬워집니다. 이를 극복하기 위해 다결정 입자 대신 깨짐이 없는 단결정(Single crystal) 양극재를 도입해 전해액과의 부반응 면적을 줄이고, 결정 구조를 지탱하는 Al 도핑 및 안전 강화 분리막(SRS/CCS)을 채택하여 열폭주 전파를 물리화학적으로 억제합니다.'
      }
    ],
    quiz: [
      {
        id: 'qb1',
        question: '리튬이온 배터리에서 음극 표면에 형성되어 지속적인 전해액 분해를 막고 리튬 이온만 선택적으로 투과시키는 피막의 명칭은?',
        options: ['SEI (Solid Electrolyte Interphase)', 'Al2O3 Ceramic Coat', 'Lithium Dendrite Layer', 'PVDF Binder Matrix'],
        correctIndex: 0,
        explanation: 'SEI 피막은 초기 충전(화성 공정) 시 음극과 전해액의 환원 반응으로 생성되는 핵심 보호 피막입니다.'
      }
    ]
  },
  {
    id: 'auto-ev-01',
    industry: '자동차',
    jobRole: '친환경차 차체 생산기술 & PE 시스템 엔지니어',
    title: '전기차(EV) 핫스탬핑 경량 차체 설계 및 800V 고전압 PE 시스템 제어',
    estimatedMinutes: 22,
    difficulty: '중급',
    summary: '무거운 배터리를 안전하게 보호하기 위한 1500MPa급 핫스탬핑 차체 공법과 SiC 인버터 기반 800V 초급속 충전 PE 시스템을 학습합니다.',
    coreConcepts: {
      simpleExplanation: '전기차는 엔진과 연료통 대신 거대한 고전압 배터리와 모터(PE 시스템), 그리고 이를 보호하기 위한 고강도 차체 골격이 결합된 달리는 스마트 디바이스입니다. 충돌 시 배터리가 찌그러지지 않게 초고강도 강판을 만들고, 전기를 모터로 보낼 때 열 손실을 줄이는 기술이 핵심입니다.',
      deepExplanation: '전기차는 배터리 팩 무게로 인해 공차중량이 20% 이상 무겁기 때문에, 950℃ 이상 가열 후 금형 내에서 급냉 성형하는 핫스탬핑(Hot Stamping)을 통해 마르텐사이트 조직을 유도, 1500MPa 이상의 초고장력을 달성합니다. 파워 일렉트릭(PE) 시스템에서는 실리콘(Si) 대신 밴드갭이 넓은 탄화규소(SiC) 전력반도체를 적용하여 800V 고전압 환경에서 스위칭 손실을 70% 줄이고 초급속 충전을 가능하게 합니다.',
      keyFormulasOrSchematics: '영구자석 동기모터 토크식: T = (3/2) * p * [λ_pm * i_q + (L_d - L_q) * i_d * i_q] (p=극쌍수, λ_pm=자속쇄교수)'
    },
    industrialApplicationCase: {
      title: 'E-GMP 플랫폼 차체 핫스탬핑 B필러 스프링백(Springback) 치수 변형 제어',
      companyContext: '글로벌 충돌 안전 평가(IIHS TSP+) 대응을 위한 전기차 B필러 초고강도 성형 공정 라인',
      problem: '1500MPa급 강판 성형 시 탈형 후 탄성 회복으로 인해 상하단 치수 단차가 ±2.5mm 발생하여 도어 갭 불량 및 조립 간섭 유발',
      solution: '금형 내 냉각 채널을 3D 컨포멀 형상으로 재배치하여 급냉 냉각 속도를 균일화하고, 서보 프레스 하사점 가압 유지 시간(Dwell Time) 1.5초 연장',
      outcome: '치수 공차 ±0.4mm 이내로 안정화, 차체 비틀림 강성 18% 향상 및 측면 충돌 안전 만점 획득'
    },
    glossary: [
      { term: 'Hot Stamping (열간성형)', definition: '강판을 900℃ 이상 가열 후 금형에서 성형과 동시에 급냉하여 마르텐사이트 조직으로 변태시키는 공법', importance: '1500MPa급 초고강도 구현으로 배터리 보호' },
      { term: 'Power Electric (PE) System', definition: '전기차 구동을 위한 모터, 인버터(전력변환), 감속기(변속) 일체형 구동 모듈', importance: '내연기관의 엔진과 변속기에 해당하는 핵심 동력계' },
      { term: 'Self-Piercing Rivet (SPR)', definition: '알루미늄과 강판 등 용접이 불가능한 이종 금속을 기계적으로 압입 체결하는 비열적 리벳 공법', importance: '갈바닉 부식 방지 및 차체 경량화' },
      { term: 'SiC (탄화규소) 전력반도체', definition: '실리콘 대비 절연파괴전계가 10배 높은 와이드밴드갭 반도체', importance: '800V 고전압 인버터 고효율화 및 열 손실 극소화' }
    ],
    interviewPrep: [
      {
        question: '전기차 조립 라인에서 내연기관 대비 공정 엔지니어가 가장 주의해야 할 3대 안전 및 품질 관리 요소는 무엇인가요?',
        intent: '전기차 생산 라인의 특수성(고전압, 배터리 중량, 정밀 토크) 이해도 평가',
        starGuide: {
          situation: '800V 대용량 배터리가 장착되는 EV 전용 신규 라인 셋업 상황',
          task: '작업자 감전 위험 차단, 배터리 팩 체결 신뢰성 확보, 냉각수 리크 제어',
          action: '1) DC 1000V Hi-Pot 절연 저항 전수 계측, 2) 멀티스핀들 너트러너를 통한 토크-각도(Torque-Angle) 100% 데이터 추적, 3) 배터리 냉각수 라인 헬륨 스니퍼 리크 테스트 공정 도입',
          result: '무재해 라인 셋업 및 출고 후 배터리 체결부 누수/풀림 불량 0ppm 달성'
        },
        modelAnswer: '첫째는 800V 고전압에 대한 작업자 안전과 Hi-Pot 절연 저항 전수 검사입니다. 둘째는 무거운 배터리 팩을 차체 하부에 볼팅할 때 토크-앵글(Torque-Angle) 동시 모니터링을 통한 체결 결함 방지입니다. 셋째는 배터리 화재 예방을 위해 냉각수 배관의 헬륨 가스 리크 테스트를 통한 완벽한 기밀성 확보입니다.'
      }
    ],
    quiz: [
      {
        id: 'qa1',
        question: '전기차 차체 부품 제조 시 950℃ 이상 가열 후 금형 내에서 급냉하여 1500MPa 이상의 초고강도 마르텐사이트 조직을 형성하는 공법은?',
        options: ['하이드로포밍 (Hydroforming)', '핫스탬핑 (Hot Stamping)', '딥드로잉 (Deep Drawing)', '콜드롤링 (Cold Rolling)'],
        correctIndex: 1,
        explanation: '핫스탬핑은 고온에서 강판을 성형함과 동시에 금형 냉각수로 급냉(Quenching)하여 초고강도 마르텐사이트 변태를 유도하는 공법입니다.'
      }
    ]
  },
  {
    id: 'bio-cdmo-01',
    industry: '바이오',
    jobRole: '바이오의약품 배양 & 정제 공정기술(Up/Downstream)',
    title: '단클론항체 바이오의약품 cGMP 대규모 세포배양 및 크로마토그래피 정제',
    estimatedMinutes: 24,
    difficulty: '심화',
    summary: '15,000L 초대형 생물반응기 스케일업 유체역학과 Protein A 친화성 크로마토그래피 및 바이러스 불활화 정제 메커니즘을 마스터합니다.',
    coreConcepts: {
      simpleExplanation: '세포 공장(CHO 동물 세포)을 대형 스테인리스 탱크에서 길러 원하는 치료용 단백질(항체)을 대량으로 만들어내게 한 뒤, 찌꺼기와 바이러스를 완벽히 걸러내어 99.9% 순도로 정제해 주사제로 만드는 생명공학 제조 공정입니다.',
      deepExplanation: '업스트림(Upstream)에서는 용존산소(DO), pH, 글루코스 공급을 제어하는 유가배양(Fed-batch) 방식으로 생존세포밀도(VCD)를 극대화하며, 부피 스케일업 시 전단응력(Shear Stress)과 산소전달계수(kLa)의 균형을 맞춥니다. 다운스트림(Downstream)에서는 Protein A 컬럼으로 항체의 Fc 부위를 특이적으로 결합·포획(Capture)하고, 저pH 바이러스 불활화 및 이온교환 크로마토그래피를 통해 잔류 숙주세포 단백질(HCP)을 10ppm 이하로 제거합니다.',
      keyFormulasOrSchematics: '산소전달속도 방정식: OTR = kLa * (C* - CL) (kLa: 산소전달용적계수, C*: 포화용존산소농도, CL: 실제용존산소농도)'
    },
    industrialApplicationCase: {
      title: '15,000L 상업용 바이오리액터 스케일업 시 전단응력 최소화 및 kLa 유지',
      companyContext: '글로벌 블록버스터 표적 항암제 대량 위탁생산(CDMO) 프로젝트',
      problem: '500L 파일럿에서 15,000L 상업 생산으로 증용량 시 교반 날개 끝(Tip Speed) 속도 증가로 CHO 세포막이 파괴되어 생존율(Viability)이 72%로 급락',
      solution: '전단력이 낮은 마린 프로펠러형 엘리펀트 이어(Elephant Ear) 임펠러 도입 및 마이크로 스파저(Micro-sparger) 미세 기포 분사로 교반 속도를 낮추면서도 산소전달계수(kLa) 25 h⁻¹ 확보',
      outcome: '세포 생존율 94% 유지, 최종 항체 역가(Titer) 5.2 g/L 달성으로 배치당 수백억 원의 추가 생산 가치 창출'
    },
    glossary: [
      { term: 'kLa (산소전달용적계수)', definition: '기체상의 산소가 액체 배지로 녹아 들어가는 속도를 결정하는 복합 물질전달 계수', importance: '고밀도 세포 배양 스케일업의 핵심 척도' },
      { term: 'Protein A Chromatography', definition: '항체의 Fc 영역에만 특이적으로 강하게 결합하는 친화성(Affinity) 정제 크로마토그래피', importance: '1회 공정만으로 항체 순도 95% 이상으로 농축' },
      { term: 'Host Cell Protein (HCP)', definition: '세포 배양 과정에서 생성되는 숙주(CHO) 유래 불순물 단백질', importance: '인체 투여 시 아나필락시스 쇼크를 유발하므로 10ppm 이하 관리 필수' },
      { term: 'Viral Clearance (바이러스 불활화/제거)', definition: '저pH 노출 및 20nm 나노필터를 통해 감염성 바이러스를 4 log10 이상 제거하는 공정', importance: 'FDA 의약품 시판 승인의 필수 밸리데이션 항목' }
    ],
    interviewPrep: [
      {
        question: '바이오의약품 정제 공정에서 Protein A 친화성 크로마토그래피 후 저pH 바이러스 불활화(Low pH Viral Inactivation)를 수행할 때 주의해야 할 단백질 변성 위험과 관리 방안은?',
        intent: '다운스트림 공정의 cGMP 규정 이해 및 단백질 물리화학 특성 파악 평가',
        starGuide: {
          situation: '항체 용출액을 pH 3.5~3.8로 낮춰 외피 바이러스를 사멸시키는 단계',
          task: '바이러스 사멸 효율을 만족하면서도 목적 항체의 비가역적 응집(Aggregation)을 억제',
          action: '1) 노출 시간을 정확히 60분으로 타이머 인터락 제어, 2) 2M Tris 염기 완충액을 투입하여 신속히 pH 5.0 이상으로 중화, 3) SEC-HPLC로 단량체(Monomer) 비율 실시간 분석',
          result: '바이러스 저감 계수 5.2 log 달성 및 응집체 발생률 0.5% 미만으로 cGMP 규격 통과'
        },
        modelAnswer: '저pH 바이러스 불활화는 엔벨로프 바이러스의 지질막을 파괴하여 감염력을 없애는 표준 공정입니다. 그러나 항체 단백질도 산성 환경에 장시간 노출되면 부분 언폴딩이 일어나 소수성 결합으로 인한 비가역적 응집체(Aggregate)가 형성될 위험이 있습니다. 따라서 pH 3.6±0.1 범위와 60분 노출 시간을 엄격히 자동화 인터락으로 관리하고, 반응 후 즉시 염기 완충액으로 급속 중화한 뒤 SEC-HPLC로 순도를 검증해야 합니다.'
      }
    ],
    quiz: [
      {
        id: 'qbio1',
        question: '단클론항체(mAb) 다운스트림 정제 공정에서 1차 포획(Capture) 단계에 주로 사용되며, 항체의 Fc 영역에 특이적으로 결합하는 크로마토그래피 방식은?',
        options: ['음이온 교환 크로마토그래피 (AEX)', 'Protein A 친화성 크로마토그래피', '소수성 상호작용 크로마토그래피 (HIC)', '크기 배제 크로마토그래피 (SEC)'],
        correctIndex: 1,
        explanation: 'Protein A는 황색포도상구균 유래 단백질로 항체의 불변 영역(Fc)에만 특이적으로 결합하여 1차 정제에서 고순도 포획을 달성합니다.'
      }
    ]
  },
  {
    id: 'display-oled-01',
    industry: '디스플레이',
    jobRole: '디스플레이 패널 공정개발 및 봉지(TFE) 엔지니어',
    title: '차세대 탠덤(Tandem) OLED 발광 메커니즘 및 무기/유기 복합 박막 봉지(TFE) 기술',
    estimatedMinutes: 20,
    difficulty: '중급',
    summary: '발광층을 2단으로 적층해 수명을 4배 늘린 탠덤 구조와 수분 침투를 차단하는 나노 박막 봉지(TFE) 공정을 학습합니다.',
    coreConcepts: {
      simpleExplanation: '종이처럼 얇은 패널 위에서 스스로 빛을 내는 유기 발광층을 2단으로 쌓아 밝기와 수명을 대폭 늘리고, 수분과 산소에 닿으면 즉시 타버리는 유기물을 나노 단위의 유리/플라스틱 막으로 완벽히 감싸 보호하는 기술입니다.',
      deepExplanation: '탠덤 OLED는 두 개 이상의 유기 발광 유닛(EL Unit)을 전하 생성층(CGL, Charge Generation Layer)으로 직렬 연결하여 동일 전류 밀도에서 발광 효율을 2배, 수명을 4배 이상 향상시킵니다. 유기물은 수분에 극도로 취약하므로 PECVD 기반 SiNx 무기막(치밀한 수분 차단)과 잉크젯 유기막(파티클 평탄화)을 교대로 적층하는 박막 봉지(TFE, Thin Film Encapsulation)를 통해 수분투과율(WVTR < 10⁻⁶ g/m²/day)을 달성합니다.',
      keyFormulasOrSchematics: '발광 내부양자효율: η_int = γ * η_st * Φ_PL (γ: 전하주입균형도, η_st: 일중항/삼중항 여기자 비율, Φ_PL: 광발광 양자효율)'
    },
    industrialApplicationCase: {
      title: 'IT용 8.6세대 대면적 OLED 증착 시 FMM(파인메탈마스크) 중앙부 처짐(Sagging) 극복',
      companyContext: '태블릿·노트북용 프리미엄 고해상도 탠덤 OLED 양산 라인',
      problem: '8.6세대(2,290×2,620mm) 기판 크기가 커짐에 따라 20μm 극박 FMM 인바(Invar) 마스크의 자중 처짐으로 화소 중첩 및 혼색 불량 발생',
      solution: '다분할 마스크 인장 클램프 지지대 설계 및 증착 챔버 내 정전 척(Electrostatic Chuck) 척킹 압력 균일화',
      outcome: '화소 위치 정확도(Position Accuracy) ±2.5μm 달성 및 4K 해상도 수율 88% 돌파'
    },
    glossary: [
      { term: 'Tandem OLED', definition: '발광층을 2개 이상 수직 적층하고 CGL로 연결하여 동일 휘도에서 전력소모를 낮추고 수명을 비약적으로 늘린 구조', importance: 'IT 및 차량용 프리미엄 OLED의 핵심 기술' },
      { term: 'Charge Generation Layer (CGL)', definition: 'N형과 P형 층으로 구성되어 전압 인가 시 전자와 정공을 자발 생성해 위아래 발광층에 주입하는 중간층', importance: '탠덤 소자의 작동을 가능하게 하는 핵심 계면' },
      { term: 'Thin Film Encapsulation (TFE)', definition: '유기/무기 박막을 교대로 증착하여 외부 수분과 산소 침투를 원천 차단하는 초박막 밀봉 기술', importance: '플렉서블 디스플레이의 두께 및 벤딩 신뢰성 결정' },
      { term: 'WVTR (수분투과율)', definition: '단위 면적당 하루에 통과하는 수분의 질량 (g/m²/day)', importance: 'OLED는 10^-6 수준의 극한 수분 차단 필수' }
    ],
    interviewPrep: [
      {
        question: 'OLED 패널에서 수분과 산소가 침투했을 때 발생하는 소자 불량 현상(다크스팟)의 원인과 이를 방지하는 TFE의 무기/유기 복합 적층 원리를 설명하세요.',
        intent: '유기 전자소자의 열화 메커니즘과 나노 박막 봉지 공학 이해도 평가',
        starGuide: {
          situation: '패널에 검은 점(Dark Spot)이 생기며 점차 확장되는 불량 발생',
          task: '음극 계면 박리와 유기물 산화 메커니즘을 차단하는 봉지 구조 설계',
          action: 'SiNx 무기막으로 수분 확산을 차단하고, 챔버 파티클로 인한 핀홀(Pinhole) 결함은 액상 유기 모노머 잉크젯으로 평탄화(Decoupling)하여 적층',
          result: '수분 침투 경로(Tortuous Path) 극대화로 10년 수명 신뢰성 달성'
        },
        modelAnswer: '수분이 침투하면 반응성이 큰 저일함수 금속 음극(LiF/Al 등)이 산화되어 절연성 금속 산화물을 형성하고 음극이 유기막으로부터 박리되어 빛이 나지 않는 다크스팟이 발생합니다. 이를 막기 위해 PECVD SiNx 무기막으로 수분 분자를 물리적으로 차단하고, 무기막 표면의 미세 파티클로 생기는 크랙을 유기막 잉크젯으로 덮어 평탄화함으로써 수분의 확산 경로를 우회(Tortuous Path)시키는 하이브리드 TFE 구조를 적용합니다.'
      }
    ],
    quiz: [
      {
        id: 'qdisp1',
        question: '탠덤(Tandem) OLED에서 두 개 이상의 발광 유닛(Unit) 사이에 위치하여 전압 인가 시 전자와 정공을 생성하여 각 유닛으로 공급해주는 핵심 층의 명칭은?',
        options: ['HTL (정공수송층)', 'CGL (전하생성층, Charge Generation Layer)', 'EIL (전자주입층)', 'TFE (박막봉지층)'],
        correctIndex: 1,
        explanation: 'CGL(Charge Generation Layer)은 탠덤 OLED의 중간에서 외부 전극 연결 없이도 전자와 정공을 양방향으로 공급해주는 핵심 매개체입니다.'
      }
    ]
  },
  {
    id: 'chem-specialty-01',
    industry: '화학',
    jobRole: '전자소재 케미컬 합성 & 고순도 분리정제 공정 엔지니어',
    title: '반도체·이차전지용 초고순도(Ultra-High Purity) 전자소재 케미컬 분리정제 공정',
    estimatedMinutes: 22,
    difficulty: '중급',
    summary: '반도체 세정용 초고순도 IPA 및 배터리 전해액 용매를 ppb/ppt 단위 불순물 없이 정제하는 정밀 증류 및 막분리 기술을 학습합니다.',
    coreConcepts: {
      simpleExplanation: '석유에서 나온 기초 물질을 단순히 가공하는 것을 넘어, 나노미터 반도체 회로를 씻어낼 때 먼지 한 톨 남기지 않는 극초고순도 알코올(IPA)이나 배터리 수명을 갉아먹는 미량의 수분을 10억분의 1 단위(ppb)까지 걸러내는 초정밀 화학 정제 기술입니다.',
      deepExplanation: '기액 평형(VLE) 원리에 기반한 다단 분별 증류탑 설계와 함께, 비등점 차이가 극히 미세하거나 공비점(Azeotrope)을 형성하는 혼합물을 분리하기 위해 감압 증류(Vacuum Distillation) 및 압력 스윙 증류(PSD)를 적용합니다. 미량 금속 이온(Fe, Na, Cu 등)은 킬레이트 이온교환수지와 PTFE 서브나노 멤브레인 필터레이션을 통해 10ppt 이하 수준으로 엄격 제어합니다.',
      keyFormulasOrSchematics: 'Fenske 식 (최소 이론단수): N_min = ln[ (xD/(1-xD)) * ((1-xB)/xB) ] / ln(α_avg) (α: 상대휘발도)'
    },
    industrialApplicationCase: {
      title: '반도체 3nm 세정용 초고순도 전자급 IPA(EL-IPA) 10ppb 이하 금속 정제',
      companyContext: '첨단 파운드리 공급용 고순도 전자소재 케미컬 플랜트',
      problem: '기존 증류탑 배관 마모 및 원료 내 미량 금속 이온이 제품에 혼입되어 웨이퍼 수율 저하를 일으키는 50ppb 수준 오염 발생',
      solution: '증류탑 내부 트레이를 내식성 초고순도 PFA 불소수지로 라이닝하고, 최종 출하 라인에 2단 킬레이트 이온교환 수지탑 및 5nm PTFE 필터 인라인 설치',
      outcome: '금속 불순물 농도 0.8ppb(글로벌 최상위 등급) 달성 및 글로벌 파운드리 벤더 1차 품질 승인 획득'
    },
    glossary: [
      { term: 'Ultra-High Purity (초고순도 전자소재)', definition: '불순물 함량이 ppb(10억분의 1) 또는 ppt(1조분의 1) 단위 이하로 제어된 첨단 화학 물질', importance: '반도체 미세화 시 단락 및 소자 결함 방지의 기본 전제' },
      { term: 'Azeotrope (공비혼합물)', definition: '액체 상태와 기체 상태의 조성이 동일하여 단순 가열 증류로는 더 이상 분리할 수 없는 특정 조성비의 혼합물', importance: '특수 증류(추출 증류, 감압 증류) 공정 설계 필요' },
      { term: 'VLE (기액 평형, Vapor-Liquid Equilibrium)', definition: '특정 온도와 압력에서 액체상과 기체상이 평형을 이루는 물리화학적 상태', importance: '분별 증류탑 트레이 단수 계산의 기초' }
    ],
    interviewPrep: [
      {
        question: '물과 에탄올처럼 공비점(Azeotrope)을 갖는 용액을 고순도로 분리하기 위한 화학공학적 기법 2가지를 설명하세요.',
        intent: '분리공정(Separation Process) 기초 열역학 및 상평형 메커니즘 검증',
        starGuide: {
          situation: '단순 비등점 차이를 이용한 분별 증류로는 공비 조성 이상으로 농축할 수 없는 한계',
          task: '열역학적 상평형 곡선을 변화시켜 순도 99.9% 이상으로 정제',
          action: '1) 제3의 성분을 투입해 공비 혼합물의 상대휘발도를 바꾸는 공비/추출 증류(Extractive Distillation), 2) 압력에 따라 공비점이 이동하는 특성을 이용해 두 증류탑의 운전 압력을 다르게 하는 압력 스윙 증류(PSD) 적용',
          result: '추가 용제 오염 없이 연속식 초고순도 분리 달성'
        },
        modelAnswer: '첫째는 압력 스윙 증류(Pressure Swing Distillation, PSD)입니다. 대부분의 공비 혼합물은 시스템 압력에 따라 공비 조성이 달라지므로, 고압탑과 저압탑을 직렬 연결하여 첫 번째 탑의 공비물을 두 번째 탑의 비공비 영역으로 보내 고순도 분리를 이뤄냅니다. 둘째는 추출 증류(Extractive Distillation)로, 비휘발성 고비점 추출 용제(Entrainer)를 첨가하여 원 혼합물 성분 간의 상대휘발도를 1 이상으로 벌려 분리합니다.'
      }
    ],
    quiz: [
      {
        id: 'qchem1',
        question: '기액 평형(VLE)에서 액체와 기체의 조성이 같아져 일반적인 단순 가열 증류로는 더 이상 분리할 수 없는 혼합물 상태를 무엇이라 하는가?',
        options: ['공정 혼합물 (Eutectic Mixture)', '공비 혼합물 (Azeotrope)', '과포화 용액 (Supersaturated Solution)', '콜로이드 용액 (Colloid)'],
        correctIndex: 1,
        explanation: '공비혼합물(Azeotrope)은 기체상과 액체상의 조성이 일치하여 일반 분별 증류로 순수 성분을 분리해낼 수 없습니다.'
      }
    ]
  },
  {
    id: 'it-embedded-01',
    industry: '전자 및 IT',
    jobRole: '온디바이스 AI 하드웨어 가속기(NPU) & 시스템 SoC 엔지니어',
    title: '온디바이스 AI 경량화 NPU 아키텍처 및 하드웨어 가속기 최적화',
    estimatedMinutes: 24,
    difficulty: '심화',
    summary: '시스톨릭 어레이 기반 행렬 곱셈기와 메모리 월(Memory Wall)을 극복하기 위한 INT8/INT4 후양자화(PTQ) 설계를 마스터합니다.',
    coreConcepts: {
      simpleExplanation: '거대한 AI 모델을 대형 서버 없이 스마트폰이나 로봇 기기 자체에서 적은 배터리로 빠르게 구동할 수 있도록, 불필요한 계산을 줄이고 인공지능 전용 뇌(NPU 가속 칩)를 설계하여 속도와 전력 효율을 극대화하는 기술입니다.',
      deepExplanation: '딥러닝의 핵심 연산인 합성곱(Convolution)과 행렬 곱셈을 초고속으로 처리하기 위해 연산기(PE)들이 데이터를 인접 셀로 직접 흘려보내는 시스톨릭 어레이(Systolic Array) 구조를 채택합니다. 연산 속도보다 DRAM 데이터 이동에 90% 이상의 에너지가 소모되는 메모리 월(Memory Wall)을 타개하기 위해, 부동소수점(FP32) 가중치를 정수(INT8/INT4)로 변환하는 사후 양자화(PTQ)와 지능형 온칩 SRAM 버퍼 재사용(Data Reuse) 아키텍처를 구현합니다.',
      keyFormulasOrSchematics: '균일 대칭 양자화 공식: q = clip( round(r / S), -2^(b-1), 2^(b-1) - 1 ) (r: 실수 가중치, S: 스케일 팩터, b: 비트 폭)'
    },
    industrialApplicationCase: {
      title: '온디바이스 거대언어모델(LLM) 구동을 위한 NPU 4비트(INT4) 가중치 양자화',
      companyContext: '차세대 플래그십 모바일 AP(애플리케이션 프로세서) 온디바이스 AI 코프로세서 설계',
      problem: '70억 파라미터(7B) LLM 모델을 모바일 DRAM에 로드 시 14GB 메모리와 초당 5W 이상의 과도한 발열 발생으로 쓰로틀링(Throttling) 유발',
      solution: '중요 이상치(Outlier) 채널만 선택적으로 16비트를 유지하고 나머지를 4비트로 압축하는 혼합 정밀도(Mixed-Precision) 양자화 알고리즘 및 전용 디인터리빙 NPU 하드웨어 디코더 구현',
      outcome: 'DRAM 대역폭 요구량 65% 절감, 토큰당 에너지 소모 3.2배 개선, 모바일 단말에서 초당 22토큰 생성 속도 달성'
    },
    glossary: [
      { term: 'Systolic Array (시스톨릭 어레이)', definition: '데이터가 연산 장치(Processing Element) 배열을 심장 박동처럼 규칙적으로 통과하며 레지스터를 재사용하는 병렬 연산 구조', importance: 'GPU 대비 전력 효율 5배 이상의 NPU 핵심 코어' },
      { term: 'Memory Wall (메모리 월)', definition: '연산 장치의 속도 발전 속도에 비해 외부 메모리(DRAM) 대역폭과 접근 지연 시간이 따라가지 못해 생기는 성능 병목', importance: '온칩 SRAM 캐시 계층화 및 양자화의 최대 동기' },
      { term: 'Quantization (양자화)', definition: '32비트 고정밀 부동소수점 데이터를 8비트 또는 4비트 정수로 매핑하여 모델 크기와 연산량을 대폭 축소하는 기법', importance: '정확도 손실 1% 이내로 모바일 온디바이스 배포 가능' }
    ],
    interviewPrep: [
      {
        question: 'CPU, GPU, NPU의 구조적 차이점과 특히 인공지능 추론(Inference) 워크로드에서 NPU가 가장 높은 에너지 효율을 내는 하드웨어적 이유를 설명하세요.',
        intent: '컴퓨터 구조론 및 딥러닝 가속기 아키텍처의 기본 원리 검증',
        starGuide: {
          situation: '모바일 배터리 제약 환경에서 실시간 딥러닝 추론 필요',
          task: '범용 프로세서 대비 와트당 성능(Performance per Watt) 극대화',
          action: '복잡한 분기 예측 및 캐시 제어 로직을 걷어내고, 행렬 곱셈 전용 MAC 연산기 집적과 시스톨릭 어레이 데이터 재사용을 설계',
          result: '불필요한 명령어 디코딩 오버헤드와 DRAM 왕복 트래픽을 차단해 에너지 효율 10배 달성'
        },
        modelAnswer: 'CPU는 복잡한 직렬 제어와 지연 시간 최소화에 최적화되어 있고, GPU는 방대한 코어를 병렬화했으나 여전히 많은 명령어 디코딩과 범용 캐시 오버헤드를 가집니다. 반면 NPU는 딥러닝 추론의 95% 이상을 차지하는 행렬 연산(MAC)만을 위해 불필요한 제어부를 제거하고, 시스톨릭 어레이를 통해 가중치와 활성화 값을 내부 PE끼리 재사용함으로써 DRAM 접근을 극소화하여 동일 연산 대비 압도적인 전력 효율을 냅니다.'
      }
    ],
    quiz: [
      {
        id: 'qit1',
        question: '행렬 곱셈 연산 시 메모리에서 데이터를 매번 읽어오지 않고 인접한 연산 셀(PE)로 데이터를 직접 파이프라이닝하여 전달하는 NPU의 대표적인 병렬 연산 하드웨어 구조는?',
        options: ['본 노이만 버스 (Von Neumann Bus)', '시스톨릭 어레이 (Systolic Array)', '슈퍼스칼라 파이프라인 (Superscalar Pipeline)', '인터럽트 벡터 테이블 (Interrupt Vector Table)'],
        correctIndex: 1,
        explanation: '시스톨릭 어레이(Systolic Array)는 심장 박동(Systole)처럼 데이터가 규칙적으로 셀 간을 흐르며 누적 연산되어 메모리 접근을 획기적으로 줄이는 NPU의 핵심 구조입니다.'
      }
    ]
  }
];


export const JOB_POSTINGS: JobPostingSample[] = [
  {
    id: 'jd-samsung-semi',
    companyName: '삼성전자 DS부문',
    jobTitle: '메모리사업부 제조기술센터 공정기술 엔지니어 (신입)',
    industry: '반도체',
    deadline: '2026-11-15',
    location: '화성 / 평택 캠퍼스',
    url: 'https://www.samsungcareers.com/job/semi-process-tech-2026',
    content: `[주요 직무 수행 내용]
- 최첨단 DRAM/V-NAND/HBM 양산 단위공정(Photo, Etch, ThinFilm, CMP, Cleaning) 개발 및 셋업
- 양산 라인 수율 분석(Yield Enhancement) 및 산포 제어, 불량 원인 분석 및 개선 대책 수립
- 신규 설비 도입에 따른 공정 레시피 최적화 및 챔버 매칭(Chamber Matching)
- 통계적 공정 관리(SPC) 및 고도화된 계측 데이터 분석을 통한 생산성 향상

[지원 자격 및 필요 역량]
- 전자공학, 재료공학, 화학공학, 신소재공학, 물리학 등 반도체 관련 이공계 학사 이상
- 반도체 소자 물성 및 단위 공정 메커니즘에 대한 전공 기초 지식 보유자
- 데이터 기반 문제 분석 능력 및 논리적 커뮤니케이션 역량

[우대 사항]
- 클린룸 Fab 실습, 반도체 공정/소자 실습 프로젝트 유경험자
- Python/R/Minitab 등을 활용한 반도체 수율 통계 분석 경험
- 공정 시뮬레이션(TCAD 등) 또는 분석 장비(SEM, XRD, AFM) 활용 경험자`,
    requirements: [
      '반도체 8대 단위 공정(Photo, Etch, Thin Film, CMP) 원리 이해',
      '통계적 데이터 분석 및 수율 불량 인과관계 추론 능력',
      '플라즈마/재료 물성 기초 지식 및 실험 설계(DoE) 역량',
      '생산 설비 챔버 파라미터 최적화 이해'
    ],
    preferred: [
      '대학 Fab 클린룸 단위공정 실습 포트폴리오 보유',
      'Python 기반 반도체 웨이퍼 맵 데이터 분석 프로젝트',
      '반도체 공정 관련 학회/논문 또는 공모전 수상'
    ]
  },
  {
    id: 'jd-lges-battery',
    companyName: 'LG에너지솔루션',
    jobTitle: '오창 에너지플랜트 차세대 배터리 셀 공정기술 엔지니어',
    industry: '배터리',
    deadline: '2026-11-20',
    location: '충북 오창 / 대전 R&D',
    url: 'https://careers.lg.com/lges-battery-engineer',
    content: `[주요 업무]
- 하이니켈 파우치 및 4680 원통형 배터리 전극(코팅, 롤프레싱, 슬리팅) 및 조립 공정 안정화
- 극판 버(Burr) 억제 및 Z-스태킹 공정 속도 개선을 통한 단위 틱타임(Tact time) 단축
- 슬러리 점도 및 전극 밀도 산포 최소화, 건조 구간 결함 모니터링
- MES 데이터를 활용한 수율 분석 및 스마트팩토리 설비 트러블슈팅

[지원 자격]
- 화학공학, 신소재공학, 기계공학 등 배터리 관련 전공자
- 전기화학 기본 지식 및 배터리 4대 소재(양극, 음극, 전해액, 분리막) 특성 이해자`,
    requirements: [
      '전극 공정(코팅, 롤프레스, 슬리팅) 메커니즘 이해',
      '전기화학 기초(용량 계산, N/P Ratio, C-rate)',
      'Roll-to-roll 연속 공정 및 기계적 체결 지식',
      '공정 이상 감지 및 품질 관리(SPC/FMEA) 이해'
    ],
    preferred: [
      '배터리 코인셀/파우치셀 제작 및 충방전 사이클러 실습 경험',
      '유변학(Rheology) 또는 레이저 가공 프로젝트 경험'
    ]
  }
];

export const SAMPLE_PORTFOLIOS: PortfolioSample[] = [
  {
    id: 'portfolio-semi-senior',
    title: '신소재공학 전공자의 반도체 플라즈마 식각 및 수율 분석 프로젝트 포트폴리오',
    applicantMajor: '신소재공학과 4학년 (학점: 3.92/4.5)',
    targetRole: '반도체 공정기술 / 소자설계 엔지니어',
    summary: '대학 나노종합기술원 클린룸에서 직접 6인치 웨이퍼를 대상으로 Photo-Etch-Deposition 단위 공정을 실습하였으며, Python을 활용하여 10,000개 이상의 웨이퍼 EDS 수율 데이터셋에서 불량 클러스터를 머신러닝으로 자동 판별하는 프로젝트를 성공적으로 완수한 경험이 있습니다.',
    skills: ['플라즈마 건식 식각(ICP-RIE)', '광학 노광(Stepper)', 'SEM 표면 분석', 'Python (Pandas, Scikit-learn)', 'DoE 실험계획법', 'Minitab'],
    certifications: ['반도체공정실습 고급과정 수료 (나노종합기술원)', '데이터분석준전문가 (ADsP)', 'TOEIC 880 / OPIC IH'],
    projects: [
      {
        title: '대학 나노팹 6인치 웨이퍼 SiO2 플라즈마 ICP-RIE 식각 공정 최적화',
        period: '2025.03 - 2025.06 (4개월)',
        role: '프로젝트 팀장 (공정 조건 설계 및 SEM 측정)',
        techStack: ['ICP-RIE', 'CF4/O2/Ar 가스', 'FE-SEM', 'DoE(다구찌 기법)'],
        description: 'CF4와 O2 가스 분압비 및 바이어스 파워 조절을 통해 SiO2/PR 식각 선택비를 개선하는 실험 수행. O2 첨가에 따른 플루오린 라디칼 밀도 변화를 관찰하고 측벽 패시베이션 메커니즘을 규명함.',
        quantifiableResults: '기존 공정 대비 식각 선택비 2.1:1에서 3.8:1로 80% 향상, 패턴 측벽 각도 88.5° 달성으로 언더컷 결함 전무'
      },
      {
        title: '웨이퍼 EDS 테스트 수율 맵 결함 패턴 분류 머신러닝 알고리즘 개발',
        period: '2025.09 - 2025.12 (3개월)',
        role: '데이터 엔지니어링 및 CNN 모델링',
        techStack: ['Python', 'PyTorch', 'OpenCV', 'Pandas'],
        description: 'WM-811K 오픈 웨이퍼 맵 데이터셋을 기반으로 8가지 불량 패턴(Edge-Ring, Center, Scratch, Donut 등)을 분류하는 전이학습 모델 구축. 불량 유형별 원인 공정(스핀코터 쏠림, 챔버 노즐 막힘 등)과의 매핑 규칙 정의.',
        quantifiableResults: '분류 정확도 94.6% 달성 및 기존 육안 검사 대비 판독 소요 시간 99% 단축'
      }
    ]
  },
  {
    id: 'portfolio-battery-chem',
    title: '화학공학과 지원자의 고에너지밀도 리튬이온 코인셀 제작 및 분산도 개선 포트폴리오',
    applicantMajor: '화학공학부 4학년 (학점: 3.85/4.5)',
    targetRole: '2차전지 배터리 셀 개발 및 전극 공정 엔지니어',
    summary: '배터리 기초화학 및 유변학에 대한 깊은 이해를 바탕으로 NCM811 슬러리의 분산 안정성을 개선하고, 직접 제작한 코인셀의 충방전 수명 평가와 EIS(전기화학 임피던스) 분광 분석을 수행한 경험을 보유하고 있습니다.',
    skills: ['슬러리 교반 및 점도 측정(Rheometer)', '코인셀 조립(Glovebox)', 'WBCS 충방전 사이클러', 'EIS 분석', 'OriginLab'],
    certifications: ['위험물산업기사', '화학분석기사', 'OPIC AL'],
    projects: [
      {
        title: 'NCM811 양극 슬러리 내 CNT 도전재 분산성 향상을 통한 전극 저항 저감',
        period: '2025.04 - 2025.08 (5개월)',
        role: '슬러리 배합 및 물성 측정 담당',
        techStack: ['Planetary Mixer', '점도계', '코인셀 사이클러'],
        description: '초음파 분산 및 분산제(PVP) 농도 조절을 통해 카본블랙 대신 탄소나노튜브(CNT)를 양극 슬러리에 고르게 분산시켜 전자 전도 경로를 최적화함.',
        quantifiableResults: '양극 전극 내부 저항 23% 감소, 2C 고율 방전 용량 유지율 14% 향상'
      }
    ]
  }
];

export const INDUSTRY_TRENDS: IndustryTrendItem[] = [
  {
    id: 'trend-semiconductor',
    industry: '반도체',
    weeklyNews: [
      {
        title: '글로벌 빅테크 HBM4 조기 도입 경쟁 가열... TSV 하이브리드 본딩 상용화 임박',
        date: '2026-10-28',
        source: '전자신문 / TrendForce',
        url: 'https://example.com/news/hbm4-hybrid-bonding',
        summary: '차세대 AI 가속기에 탑재될 HBM4부터 16단 적층 시 두께 규격을 맞추기 위해 범프 없이 구리와 구리를 직접 맞닿게 하는 Cu-Cu 하이브리드 본딩이 차세대 양산 공정으로 도입되는 중입니다.',
        implication: '후공정 패키징 엔지니어뿐 아니라 전공정 수준의 극초청정 CMP 평탄화 기술 역량을 가진 인재 수요가 폭증하고 있습니다.',
        isVerifiedFact: true
      },
      {
        title: '용인 반도체 메가 클러스터 1기 팹 착공 가속... 친환경 클린룸 인프라 엔지니어 채용 확대',
        date: '2026-10-25',
        source: '한국경제',
        url: 'https://example.com/news/yongin-mega-fab',
        summary: '세계 최대 규모의 용인 반도체 클러스터에 2030년까지 수백조 원이 투입되며, 초순수(UPW) 및 전력 그리드, 유해가스 스크러버 시스템을 다루는 인프라기술 직군 채용이 대폭 늘어납니다.',
        implication: '화공, 기계, 환경 전공자들의 반도체 인프라 및 설비 직군 진출 기회가 확대됩니다.',
        isVerifiedFact: true
      }
    ],
    topTechTrends: [
      {
        rank: 1,
        title: 'HBM4 및 3D TSV 이종 집적(Heterogeneous Integration)',
        impactLevel: '매우 높음',
        description: 'DRAM을 수직 적층하고 로직 베이스 다이와 인터포저로 연결하는 2.5D/3D 패키징이 AI 메모리 성능을 좌우',
        affectedProcess: '패키징(본딩), 후공정 CMP, TSV 식각 및 도금'
      },
      {
        rank: 2,
        title: '서브 2나노 GAA(Gate-All-Around) 나노시트 양산',
        impactLevel: '매우 높음',
        description: '채널 4면을 게이트가 완전히 둘러싸 누설 전류를 획기적으로 차단하는 차세대 트랜지스터 구조',
        affectedProcess: 'EUV 노광, ALD 고유전율 박막, ALE 원자층 식각'
      },
      {
        rank: 3,
        title: '300단 초고적층 V-NAND 극저온 식각(Cryogenic Etch)',
        impactLevel: '높음',
        description: '영하 60도 이하 극저온에서 플라즈마 식각 속도를 3배 높이고 탄소 마스크 소모를 줄여 종횡비 70:1 달성',
        affectedProcess: '식각 챔버 냉각, 가스 케미컬 튜닝'
      },
      {
        rank: 4,
        title: 'High-NA EUV 노광 장비 상업 라인 안착',
        impactLevel: '높음',
        description: '0.33 NA에서 0.55 NA로 렌즈 개구수를 높여 단일 노광으로 서브 10nm 피치 패터닝 달성',
        affectedProcess: '포토 공정, 레지스트 소재, 펠리클'
      },
      {
        rank: 5,
        title: 'AI 기반 스마트 팹(APC) 및 가상 계측(Virtual Metrology)',
        impactLevel: '중간',
        description: '머신러닝으로 물리적 계측 없이 공정 센서 데이터만으로 웨이퍼 막 두께와 선폭을 실시간 예측',
        affectedProcess: '전공정 계측, 공정 제어(APC), 수율 관리'
      }
    ],
    companyInvestments: [
      {
        company: '삼성전자',
        investmentField: '평택 P4 라인 및 HBM 전용 패키징 라인 증설',
        scale: '수십조 원 규모 투자 지속',
        strategicMeaning: 'AI 서버 메모리 수요 폭증에 선제 대응하고 첨단 패키징(AVP) 내재화'
      },
      {
        company: 'SK하이닉스',
        investmentField: '용인 반도체 클러스터 1기 팹 및 M15X 청주 신규 팹',
        scale: '총 20조 원 이상 투입',
        strategicMeaning: '차세대 HBM 글로벌 점유율 1위 굳히기 및 낸드 포트폴리오 재편'
      }
    ],
    industryIssues: [
      {
        issue: '미-중 반도체 장비 수출 통제 및 공급망 블록화',
        analysis: '첨단 EUV 및 DUV 장비의 대중국 반입 제한으로 글로벌 파운드리 생태계가 다변화되고 있습니다.',
        impactOnRecruitment: '국내 소부장(소재·부품·장비) 국산화 프로젝트가 늘며 국내 장비사 R&D 채용이 활발해짐.'
      }
    ],
    promisingJobs: [
      {
        jobTitle: '첨단 패키징(AVP) 공정 개발 엔지니어',
        demandLevel: '급상승',
        coreSkills: ['하이브리드 본딩', '열해석(ANSYS)', '마이크로범프 형성', '언더필 공정'],
        whyPromising: 'AI 반도체의 핵심 병목이 메모리 패키징으로 이동함에 따라 가장 높은 연봉과 채용 수요를 보임'
      },
      {
        jobTitle: '수율 분석(Yield Enhancement) & 가상 계측 엔지니어',
        demandLevel: '급상승',
        coreSkills: ['Python/데이터 분석', 'SPC 통계학', '반도체 단위공정 메커니즘'],
        whyPromising: '첨단 미세공정의 천문학적 감가상각비를 줄이기 위한 수율 램프업(Ramp-up) 전문가 수요 급증'
      }
    ],
    applicantPrepRoadmap: [
      { step: '1단계', action: '반도체 8대 공정의 이론적 원리와 대표 설비/장비 메커니즘 숙지' },
      { step: '2단계', action: '나노종합기술원, 반도체공동연구소 등에서 클린룸 공정 실습 1회 이상 이수' },
      { step: '3단계', action: 'EDA/TCAD 툴 또는 오픈 웨이퍼 데이터셋을 활용한 불량 원인 분석 포트폴리오 구축' }
    ]
  },
  {
    id: 'trend-battery',
    industry: '배터리',
    weeklyNews: [
      {
        title: '전고체 배터리 파일럿 라인 가동 잇따라... 황화물계 고체 전해질 합성과 건식 전극 공정이 승부처',
        date: '2026-10-27',
        source: '블룸버그NEF / 한국전지산업협회',
        url: 'https://example.com/news/solid-state-dry-electrode',
        summary: '국내 배터리 3사가 2027~2028년 상용화를 목표로 전고체 배터리 파일럿 라인을 가동 중이며, 용매를 쓰지 않는 친환경 건식 전극(Dry Electrode) 공정이 원가 혁신의 핵심으로 부각되고 있습니다.',
        implication: '화학공학, 고체물리학, 분체공학 전공자의 연구개발 및 공정기술 채용 수요가 높습니다.',
        isVerifiedFact: true
      }
    ],
    topTechTrends: [
      {
        rank: 1,
        title: '건식 전극(Dry Electrode) 제조 공정',
        impactLevel: '매우 높음',
        description: 'NMP 용매와 수십 미터 건조로 없이 바인더 섬유화로 전극을 시트화하여 공정 비용 30% 절감',
        affectedProcess: '전극 믹싱 및 압연 공정'
      },
      {
        rank: 2,
        title: '황화물계 전고체 배터리(All-Solid-State)',
        impactLevel: '매우 높음',
        description: '가연성 액체 전해액을 불연성 고체 전해질로 대체하여 화재 위험 원천 차단 및 에너지 밀도 400Wh/kg 달성',
        affectedProcess: '전해질 합성, 전극-전해질 계면 본딩, 고압 프레싱'
      },
      {
        rank: 3,
        title: '원통형 4680 탭리스(Tabless) 고속 조립',
        impactLevel: '높음',
        description: '전류 경로를 극대화해 내부 저항과 발열을 1/5로 낮춘 지름 46mm 대형 원통형 폼팩터',
        affectedProcess: '극판 노칭, 레이저 용접, 캔 크림핑'
      },
      {
        rank: 4,
        title: 'LFP / LMFP(망간 첨가 LFP) 라인업 다변화',
        impactLevel: '높음',
        description: '보급형 EV 시장 대응을 위한 가격 경쟁력 중심의 리튬인산철 및 망간계 셀 양산',
        affectedProcess: '합성 공정, 저온 방전 성능 보완 전해액 설계'
      },
      {
        rank: 5,
        title: '배터리 여권(Battery Passport) 및 폐배터리 리사이클링',
        impactLevel: '중간',
        description: 'EU 배터리 규제에 따른 탄소 발자국 추적과 니켈/코발트/리튬 블랙매스 재추출 공정',
        affectedProcess: '습식 야금, 배터리 해체 및 잔존수명(SOH) 진단'
      }
    ],
    companyInvestments: [
      {
        company: 'LG에너지솔루션',
        investmentField: '오창 4680 전용 라인 및 미국 합작공장(JV) 증설',
        scale: '수조 원대 투자 지속',
        strategicMeaning: '원통형 차세대 규격 선점 및 북미 IRA 수혜 극대화'
      }
    ],
    industryIssues: [
      {
        issue: '전기차 캐즘(Chasm) 극복을 위한 중저가 배터리 및 ESS 전환 가속',
        analysis: 'EV 수요 정체기를 극복하기 위해 대용량 전력망용 ESS(에너지저장장치) 공급을 늘리고 있습니다.',
        impactOnRecruitment: 'ESS 시스템 안전 및 대용량 팩 설계 엔지니어 수요 증가'
      }
    ],
    promisingJobs: [
      {
        jobTitle: '건식 전극 및 슬러리 유변학 엔지니어',
        demandLevel: '신규 부상',
        coreSkills: ['분체공학', '바인더 섬유화 메커니즘', 'Roll-to-roll 장력 제어'],
        whyPromising: '차세대 공정 비용 혁신의 핵심 분야로 관련 경험 인재 극도로 희소'
      }
    ],
    applicantPrepRoadmap: [
      { step: '1단계', action: '전기화학 기초 및 4대 소재(양/음/분/전)의 전위차와 반응 메커니즘 학습' },
      { step: '2단계', action: '코인셀 제작 및 충방전 사이클러 측정 실습 또는 유변학 프로젝트 수행' },
      { step: '3단계', action: '배터리 열폭주 방지 기작 및 공정 이상 대처 방안 인터뷰 시나리오 구축' }
    ]
  },
  {
    id: 'trend-automotive',
    industry: '자동차',
    weeklyNews: [
      {
        title: 'SDV(소프트웨어 중심 자동차) 통합 제어기 전환 본격화... 전장 SW 및 생산 자동화 인재 쟁탈전',
        date: '2026-10-26',
        source: '오토모티브 뉴스',
        url: 'https://example.com/news/sdv-zone-controller',
        summary: '완성차 업계가 분산 제어기 수십 개를 중앙 집중식 고성능 컴퓨터와 4개의 구역(Zone) 제어기로 통합하는 차세대 전장 아키텍처 양산 단계에 돌입했습니다.',
        implication: '차량용 임베디드 SW, AUTOSAR, 무선 업데이트(OTA) 및 조립 라인 자동화 기술자 수요가 증대되고 있습니다.',
        isVerifiedFact: true
      }
    ],
    topTechTrends: [
      {
        rank: 1,
        title: 'SDV(Software Defined Vehicle) 및 존(Zone) 아키텍처',
        impactLevel: '매우 높음',
        description: '하드웨어와 소프트웨어가 분리되어 출고 후에도 기능이 지속 업그레이드되는 지능형 차량',
        affectedProcess: '전장 배선 단순화, 차량 내 E/E 조립, 최종 EOL 검사'
      },
      {
        rank: 2,
        title: '기가캐스팅(Mega-casting) 초대형 알루미늄 일체 성형',
        impactLevel: '높음',
        description: '수십 개 패널을 용접하는 대신 수천 톤 다이캐스팅으로 차체 전/후면을 한 번에 주조',
        affectedProcess: '차체 용접 라인 대폭 축소, 고압 주조 공정 도입'
      },
      {
        rank: 3,
        title: 'E-GMP 기반 800V 초급속 충전 및 SiC 전력반도체 적용',
        impactLevel: '높음',
        description: '실리콘(Si) 대신 탄화규소(SiC) 인버터를 적용하여 모터 효율 5% 향상 및 주행거리 증가',
        affectedProcess: 'PE 모듈 조립, 인버터 실링 및 방열 설계'
      },
      {
        rank: 4,
        title: '레벨 3+ 자율주행 라이다 및 센서 퓨전',
        impactLevel: '중간',
        description: '고속도로 조건부 자율주행을 위한 이중화(Redundancy) 센서와 실시간 인지 판단 알고리즘',
        affectedProcess: '센서 캘리브레이션 룸 공정, EOL 휠 얼라인먼트'
      },
      {
        rank: 5,
        title: '스마트팩토리 무인물류(AGV/AMR) 및 디지털 트윈',
        impactLevel: '중간',
        description: '컨베이어 벨트 없는 유연 셀(Cell) 생산 방식과 가상 라인 사전 시뮬레이션',
        affectedProcess: '의장 조립, 부품 피킹 자동화'
      }
    ],
    companyInvestments: [
      {
        company: '현대자동차',
        investmentField: '울산 전기차 전용 스마트공장 및 남양연구소 SDV 본부 신설',
        scale: '수조 원대 투자 집행',
        strategicMeaning: '미래 모빌리티 스마트 제조 및 소프트웨어 역량 내재화'
      }
    ],
    industryIssues: [
      {
        issue: '글로벌 무역 장벽 및 자국 내 생산 우대 정책(IRA 등)',
        analysis: '미국 조지아 메타플랜트 등 현지 생산 거점 비중이 커지고 있습니다.',
        impactOnRecruitment: '글로벌 공장 셋업 지원 및 현지 양산 기술 지원 엔지니어 선호'
      }
    ],
    promisingJobs: [
      {
        jobTitle: '전기차 전장/의장 생산기술 엔지니어',
        demandLevel: '급상승',
        coreSkills: ['전장 아키텍처', '자동화 로봇 제어(PLC)', '토크-앵글 볼팅 품질 관리'],
        whyPromising: '배터리와 모터가 결합된 EV 조립 라인의 수율과 틱타임을 관리하는 중추 역할'
      }
    ],
    applicantPrepRoadmap: [
      { step: '1단계', action: '완성차 프레스-차체-도장-의장 4대 공정 흐름과 전기차 특화 구조 파악' },
      { step: '2단계', action: 'CATIA/SolidWorks 3D 설계 또는 PLC/로봇 오프라인 티칭 실습' },
      { step: '3단계', action: '전기차 배터리 팩 결합 및 고전압 안전 관리 품질 시나리오 준비' }
    ]
  },
  {
    id: 'trend-bio',
    industry: '바이오',
    weeklyNews: [
      {
        title: '항체-약물 접합체(ADC) 위탁개발생산 수주 경쟁 격화... 전용 무균 격리 팹 증설',
        date: '2026-10-29',
        source: '바이오스펙테이터 / BioProcess Int.',
        url: 'https://example.com/news/adc-cdmo-expansion',
        summary: '미도센 등 강력한 세포독성 약물(페이로드)을 취급해야 하는 ADC 특성상 초고난도 음압 격리 설비와 링커 결합 기술을 갖춘 송도 CDMO 단지로 글로벌 수주가 집중되고 있습니다.',
        implication: '화학 유기합성 및 바이오 배양/정제 융합 지식을 보유한 엔지니어에 대한 러브콜이 급증하고 있습니다.',
        isVerifiedFact: true
      }
    ],
    topTechTrends: [
      {
        rank: 1,
        title: '항체약물접합체(ADC) 링커-페이로드 접합 공정',
        impactLevel: '매우 높음',
        description: '항체 특정 위치에 독성 약물을 일정한 비율(DAR)로 접합하는 정밀 유기합성 결합 기술',
        affectedProcess: 'ADC 접합 반응, 초미세 한외여과 정제, 고위험물질 음압 팹'
      },
      {
        rank: 2,
        title: '연속 배양 및 정제(Continuous Bioprocessing)',
        impactLevel: '높음',
        description: '배치(Batch) 방식 대신 원료 투입부터 정제까지 24시간 연속 가동하여 탱크 크기를 1/10로 축소',
        affectedProcess: '관류 배양(Perfusion), 연속 크로마토그래피'
      },
      {
        rank: 3,
        title: 'mRNA 백신 및 지질나노입자(LNP) 제형화',
        impactLevel: '높음',
        description: '불안정한 mRNA를 체내에 안전하게 전달하기 위한 미세유체(Microfluidic) LNP 캡슐화',
        affectedProcess: '무균 나노 제형 조제, 동결건조'
      },
      {
        rank: 4,
        title: 'AI 기반 단백질 설계 및 정제 공정 분석 기술(PAT)',
        impactLevel: '중간',
        description: '라만 분광법(Raman) 등으로 바이오리액터 내부 대사산물을 비파괴 실시간 분석',
        affectedProcess: '배양 모니터링, 공정 최적화'
      },
      {
        rank: 5,
        title: '싱글유즈(Single-Use) 일회용 백 시스템',
        impactLevel: '중간',
        description: '스테인리스 탱크 대신 감마선 멸균 플라스틱 백을 사용하여 세척 밸리데이션(CIP/SIP) 시간 단축',
        affectedProcess: '시드 배양, 중소규모 다품종 생산'
      }
    ],
    companyInvestments: [
      {
        company: '삼성바이오로직스',
        investmentField: '송도 5공장 및 제2바이오캠퍼스 ADC 전용 생산시설',
        scale: '약 2조 원대 투자 집행',
        strategicMeaning: '세계 최대 78만 리터 이상 생산 캐파 유지 및 포트폴리오 다각화'
      }
    ],
    industryIssues: [
      {
        issue: '미국 생물보안법(Biosecure Act) 통과에 따른 반사이익',
        analysis: '중국 CDMO 규제로 인해 미국 및 유럽 빅파마의 한국 CDMO 기업 위탁 계약이 급증하고 있습니다.',
        impactOnRecruitment: 'cGMP 규정 준수 및 글로벌 고객사 기술 이전(Tech Transfer) 전문 인력 채용 폭증'
      }
    ],
    promisingJobs: [
      {
        jobTitle: '바이오의약품 다운스트림 정제 엔지니어',
        demandLevel: '급상승',
        coreSkills: ['크로마토그래피 수율 개선', '바이러스 필터 밸리데이션', 'TFF 막여과'],
        whyPromising: '배양된 단백질을 99.9% 순도로 회수하는 정제 공정이 최종 원가와 승인의 병목'
      }
    ],
    applicantPrepRoadmap: [
      { step: '1단계', action: '미국 FDA cGMP 가이드라인 및 세포배양/정제 기본 단위 조작 이해' },
      { step: '2단계', action: 'HPLC, 단백질 정량(BCA/ELISA), 겔 전기영동(SDS-PAGE) 실습 경험 축적' },
      { step: '3단계', action: '무균 조작(Aseptic processing) 및 오염 발생 시 트러블슈팅 답변 연습' }
    ]
  },
  {
    id: 'trend-display',
    industry: '디스플레이',
    weeklyNews: [
      {
        title: 'IT용 8.6세대 OLED 양산 라인 가동... 탠덤 OLED 기술이 노트북·태블릿 평정',
        date: '2026-10-24',
        source: '디스플레이서플라이체인(DSCC)',
        url: 'https://example.com/news/it-oled-tandem',
        summary: '발광층을 2개 층으로 쌓아 수명을 4배, 밝기를 2배 높인 탠덤 OLED 구조가 프리미엄 IT 디바이스의 표준으로 자리잡았습니다.',
        implication: '박막 봉지(TFE) 및 초고정밀 FMM(파인메탈마스크) 증착 엔지니어 수요 확대',
        isVerifiedFact: true
      }
    ],
    topTechTrends: [
      { rank: 1, title: '8.6세대 IT용 탠덤(Tandem) OLED', impactLevel: '매우 높음', description: '유기물 발광층 2단 적층으로 긴 수명과 저소비전력 달성', affectedProcess: '진공 열증착(Evaporation), FMM 마스크' },
      { rank: 2, title: '차세대 마이크로 LED 및 초소형 디스플레이(OLEDoS)', impactLevel: '높음', description: 'XR 공간 컴퓨팅 기기용 실리콘 웨이퍼 위 초고해상도 패널', affectedProcess: '마이크로 LED 전사(Transfer), 웨이퍼 백플레인' }
    ],
    companyInvestments: [{ company: 'LG디스플레이', investmentField: '파주 탠덤 OLED 라인 전환', scale: '수조 원', strategicMeaning: '차량용 및 IT OLED 독보적 경쟁력 확보' }],
    industryIssues: [{ issue: '중국 패널사와의 모바일 OLED 가격 경쟁', analysis: '기술 격차 유지 위해 차량용 및 특수 디스플레이 집중', impactOnRecruitment: '차량 신뢰성 평가 엔지니어 채용' }],
    promisingJobs: [{ jobTitle: 'OLED 박막 봉지(TFE) 공정 엔지니어', demandLevel: '안정적 성장', coreSkills: ['PECVD', '무기/유기 하이브리드 박막', '수분투과율(WVTR) 제어'], whyPromising: '유기물 산화 방지 및 플렉서블 폼팩터의 핵심' }],
    applicantPrepRoadmap: [{ step: '1단계', action: 'OLED 발광 원리 및 박막 트랜지스터(LTPO, Oxide TFT) 구조 학습' }]
  },
  {
    id: 'trend-chem',
    industry: '화학',
    weeklyNews: [
      {
        title: '석유화학 고부가가치 스페셜티(Specialty) 및 친환경 바이오 플라스틱 전환 가속',
        date: '2026-10-23',
        source: '화학저널',
        url: 'https://example.com/news/specialty-chem',
        summary: '기초유분 범용 제품의 공급 과잉을 극복하기 위해 반도체용 초고순도 케미컬(IPA, 황산) 및 배터리 바인더용 고분자 전환이 활발합니다.',
        implication: '정밀화학 합성 및 고순도 정제 증류 공정 엔지니어 우대',
        isVerifiedFact: true
      }
    ],
    topTechTrends: [
      { rank: 1, title: '반도체/이차전지용 전자소재 케미컬(Ultra-High Purity)', impactLevel: '높음', description: 'ppb 단위 금속 불순물 제어 초고순도 용제', affectedProcess: '증류탑 정밀 분리, 필터레이션' }
    ],
    companyInvestments: [{ company: 'LG화학', investmentField: '배터리 양극재 및 첨단소재 R&D', scale: '지속 투자', strategicMeaning: '전통 석유화학에서 배터리 소재 중심 체질 개선' }],
    industryIssues: [{ issue: '탄소국경조정제도(CBAM) 시행', analysis: '친환경 탈탄소 공정 및 폐플라스틱 열분해 유화 필수', impactOnRecruitment: '탄소 포집(CCUS) 엔지니어 채용' }],
    promisingJobs: [{ jobTitle: '초고순도 화학 정제 엔지니어', demandLevel: '급상승', coreSkills: ['정밀 증류', '금속 불순물 ICP-MS 분석'], whyPromising: '반도체 미세화로 인한 초고순도 케미컬 필수화' }],
    applicantPrepRoadmap: [{ step: '1단계', action: '분리공정(증류, 흡착) 및 화학반응공학 복습' }]
  },
  {
    id: 'trend-it',
    industry: '전자 및 IT',
    weeklyNews: [
      {
        title: '온디바이스 AI 스마트폰 및 AI PC 확산... 초저전력 NPU 및 시스템 LSI 설계 인기',
        date: '2026-10-22',
        source: 'ZDNet Korea',
        url: 'https://example.com/news/on-device-ai-npu',
        summary: '네트워크 연결 없이 기기 자체에서 거대 언어 모델을 구동하는 온디바이스 AI 칩셋 설계가 모바일 혁신의 중심축으로 부상했습니다.',
        implication: '하드웨어 가속기 설계(Verilog) 및 AI 경량화(양자화) SW 엔지니어 수요 급증',
        isVerifiedFact: true
      }
    ],
    topTechTrends: [
      { rank: 1, title: '온디바이스 신경망처리장치(NPU) 최적화', impactLevel: '매우 높음', description: 'INT4/INT8 초저전력 연산 아키텍처', affectedProcess: 'RTL 설계, 백엔드 P&R' }
    ],
    companyInvestments: [{ company: '삼성전자 시스템LSI', investmentField: '차세대 엑시노스 AI ISP 및 NPU 설계', scale: '지속 투자', strategicMeaning: '플래그십 모바일 AP 경쟁력 회복' }],
    industryIssues: [{ issue: '빅테크 자체 실리콘(Custom Silicon) 개발 확대', analysis: '범용 칩 대신 특정 워크로드 전용 ASIC 설계 급증', impactOnRecruitment: 'ASIC/FPGA 검증 엔지니어 품귀 현상' }],
    promisingJobs: [{ jobTitle: 'AI 가속기 RTL 설계 및 검증 엔지니어', demandLevel: '급상승', coreSkills: ['SystemVerilog', 'UVM', 'NPU 아키텍처'], whyPromising: 'AI 하드웨어 수요 폭발' }],
    applicantPrepRoadmap: [{ step: '1단계', action: '디지털 시스템 설계 및 컴퓨터 구조론 완벽 이해' }]
  }
];
