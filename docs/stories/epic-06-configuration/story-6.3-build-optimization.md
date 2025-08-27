# Story 6.3: 빌드 최적화 설정

## 📋 Story 카드
**Title**: 빌드 최적화 설정  
**Epic**: Configuration Management  
**Priority**: P2 (Medium)  
**Points**: 2점  
**Assignee**: TBD  
**Sprint**: TBD

## 📝 User Story
```
As a 개발자
I want 빌드 프로세스가 최적화되어 빠르고 안정적으로 작동하여
So that 개발 생산성이 향상되고 배포가 효율적으로 이루어진다
```

## ✅ Acceptance Criteria
- [ ] 빌드 시간이 현재 대비 30% 이상 단축된다
- [ ] 환경별 빌드 설정이 자동화된다
- [ ] 빌드 캐싱이 효과적으로 작동한다
- [ ] CI/CD 파이프라인과 통합된다
- [ ] 에러 처리 및 복구 메커니즘이 구현된다
- [ ] 빌드 상태 모니터링이 가능하다

## 🔧 세분화된 Technical Tasks (2점)

### Task 1: Next.js 빌드 최적화 (0.75점)
- [ ] 컴파일러 최적화 (SWC 설정)
- [ ] 증분 빌드 활성화
- [ ] 번들 크기 최적화 설정
- [ ] Tree-shaking 강화

### Task 2: 개발 환경 빌드 개선 (0.5점)
- [ ] Hot reload 최적화
- [ ] Fast refresh 설정
- [ ] 개발 서버 성능 향상
- [ ] 타입 체크 최적화

### Task 3: 프로덕션 빌드 최적화 (0.5점)
- [ ] Static generation 최적화
- [ ] 압축 설정 강화
- [ ] 캐싱 전략 개선
- [ ] 배포 파일 최적화

### Task 4: 빌드 모니터링 및 자동화 (0.25점)
- [ ] 빌드 시간 추적
- [ ] 에러 알림 시스템
- [ ] 자동 재빌드 설정
- [ ] 성능 회귀 감지

## 🏗️ Implementation Details

### Next.js 최적화 설정

#### `next.config.js` 종합 최적화
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 컴파일러 최적화
  swcMinify: true,
  compiler: {
    // 프로덕션에서 console.log 제거
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
    
    // React 컴파일러 최적화
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? {
      properties: ['^data-testid$']
    } : false,
    
    // styled-components 최적화 (사용시)
    styledComponents: true,
  },

  // 실험적 기능 (성능 향상)
  experimental: {
    // 앱 디렉토리 최적화
    appDir: true,
    
    // 서버 컴포넌트 최적화
    serverComponentsExternalPackages: ['@prisma/client'],
    
    // 번들링 최적화
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'date-fns'
    ],
    
    // 폰트 최적화
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } }
    ],
    
    // 이미지 최적화
    optimizeCss: true,
    
    // 메타데이터 최적화
    optimizeServerReact: true,
  },

  // 출력 설정
  output: 'standalone', // Docker 배포 최적화
  
  // 압축 설정
  compress: true,
  
  // 파워 바이 헤더 제거 (보안)
  poweredByHeader: false,
  
  // 트레일링 슬래시 정규화
  trailingSlash: false,
  
  // 리다이렉트 최적화
  async redirects() {
    return [
      // 필요한 리다이렉트만 포함
    ];
  },
  
  // 헤더 최적화
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // Static assets 캐싱
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Webpack 최적화
  webpack: (config, { dev, isServer, webpack, buildId }) => {
    // 프로덕션 최적화
    if (!dev) {
      // 소스맵 최적화
      config.devtool = 'hidden-source-map';
      
      // 번들 분석
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: isServer 
              ? '../analyze/server.html' 
              : './analyze/client.html'
          })
        );
      }
    }

    // 빌드 최적화
    config.optimization = {
      ...config.optimization,
      
      // 모듈 연결 최적화
      concatenateModules: !dev,
      
      // 사이드 이펙트 최적화
      sideEffects: false,
      
      // 청크 분할 최적화
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
    };

    // 개발 환경 최적화
    if (dev) {
      // Fast refresh 강화
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    return config;
  },

  // 환경 변수 최적화
  env: {
    BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'dev',
    BUILD_TIME: new Date().toISOString(),
  },
};

module.exports = nextConfig;
```

### 개발 환경 최적화

#### `scripts/dev-optimize.js`
```javascript
const { spawn } = require('child_process');
const chokidar = require('chokidar');
const path = require('path');

class DevOptimizer {
  constructor() {
    this.restartDelay = 1000;
    this.isRestarting = false;
    this.process = null;
  }

  start() {
    console.log('🚀 Starting optimized development server...');
    this.startNextDev();
    this.setupFileWatcher();
  }

  startNextDev() {
    if (this.process) {
      this.process.kill();
    }

    this.process = spawn('next', ['dev'], {
      stdio: 'inherit',
      env: {
        ...process.env,
        // 개발 최적화 환경 변수
        NEXT_TELEMETRY_DISABLED: '1',
        NODE_OPTIONS: '--max_old_space_size=4096',
      }
    });

    this.process.on('exit', (code) => {
      if (!this.isRestarting && code !== 0) {
        console.log('💥 Dev server crashed, restarting...');
        setTimeout(() => this.startNextDev(), 2000);
      }
    });
  }

  setupFileWatcher() {
    const watcher = chokidar.watch([
      'next.config.js',
      'tailwind.config.js',
      '.env*'
    ], {
      ignored: /node_modules/,
      ignoreInitial: true
    });

    watcher.on('change', (filepath) => {
      console.log(`📁 Config file changed: ${filepath}`);
      this.gracefulRestart();
    });
  }

  gracefulRestart() {
    if (this.isRestarting) return;
    
    this.isRestarting = true;
    console.log('🔄 Gracefully restarting dev server...');
    
    setTimeout(() => {
      this.startNextDev();
      this.isRestarting = false;
    }, this.restartDelay);
  }
}

// CLI 실행
if (require.main === module) {
  const optimizer = new DevOptimizer();
  optimizer.start();
}

module.exports = DevOptimizer;
```

### 빌드 캐싱 최적화

#### `scripts/cache-manager.js`
```javascript
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class BuildCacheManager {
  constructor() {
    this.cacheDir = '.next/cache/custom';
    this.manifestPath = path.join(this.cacheDir, 'manifest.json');
  }

  ensureCacheDir() {
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  generateFileHash(filePath) {
    try {
      const content = fs.readFileSync(filePath);
      return crypto.createHash('md5').update(content).digest('hex');
    } catch (error) {
      return null;
    }
  }

  loadManifest() {
    try {
      return JSON.parse(fs.readFileSync(this.manifestPath, 'utf8'));
    } catch (error) {
      return { files: {}, lastBuild: null };
    }
  }

  saveManifest(manifest) {
    this.ensureCacheDir();
    fs.writeFileSync(this.manifestPath, JSON.stringify(manifest, null, 2));
  }

  checkCacheValidity() {
    const manifest = this.loadManifest();
    const criticalFiles = [
      'next.config.js',
      'package.json',
      'tailwind.config.js',
      'tsconfig.json'
    ];

    let cacheValid = true;
    const currentHashes = {};

    for (const file of criticalFiles) {
      const currentHash = this.generateFileHash(file);
      currentHashes[file] = currentHash;

      if (manifest.files[file] !== currentHash) {
        console.log(`🔄 Cache invalid: ${file} changed`);
        cacheValid = false;
      }
    }

    return { valid: cacheValid, hashes: currentHashes };
  }

  updateCache() {
    const { hashes } = this.checkCacheValidity();
    const manifest = {
      files: hashes,
      lastBuild: new Date().toISOString()
    };

    this.saveManifest(manifest);
    console.log('💾 Build cache updated');
  }

  clearCache() {
    if (fs.existsSync(this.cacheDir)) {
      fs.rmSync(this.cacheDir, { recursive: true, force: true });
      console.log('🧹 Build cache cleared');
    }
  }
}

module.exports = BuildCacheManager;
```

### CI/CD 최적화 설정

#### `.github/workflows/optimized-build.yml`
```yaml
name: Optimized Build

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  PNPM_VERSION: '8'

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Install pnpm
        run: npm install -g pnpm@${{ env.PNPM_VERSION }}

      - name: Get pnpm cache directory
        id: pnpm-cache
        run: echo "dir=$(pnpm store path)" >> $GITHUB_OUTPUT

      - name: Cache pnpm dependencies
        uses: actions/cache@v3
        with:
          path: ${{ steps.pnpm-cache.outputs.dir }}
          key: ${{ runner.os }}-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-

      - name: Cache Next.js build
        uses: actions/cache@v3
        with:
          path: |
            ~/.npm
            ${{ github.workspace }}/.next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('**/pnpm-lock.yaml') }}-${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx') }}
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('**/pnpm-lock.yaml') }}-

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run type check
        run: pnpm run type-check

      - name: Run linting
        run: pnpm run lint

      - name: Run tests
        run: pnpm run test:ci

      - name: Build application
        run: pnpm run build
        env:
          NODE_ENV: production
          SKIP_TYPE_CHECK: true

      - name: Analyze bundle size
        run: pnpm run analyze
        if: github.event_name == 'pull_request'

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: |
            .next/
            !.next/cache
        if: success()

  lighthouse:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-files
          path: .next/

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

### 빌드 모니터링

#### `scripts/build-monitor.js`
```javascript
const { performance } = require('perf_hooks');
const fs = require('fs');

class BuildMonitor {
  constructor() {
    this.startTime = performance.now();
    this.stages = new Map();
    this.metrics = {
      buildTime: 0,
      bundleSize: 0,
      chunkCount: 0,
      errors: [],
      warnings: []
    };
  }

  startStage(name) {
    this.stages.set(name, performance.now());
    console.log(`⏱️  Starting: ${name}`);
  }

  endStage(name) {
    const start = this.stages.get(name);
    if (start) {
      const duration = performance.now() - start;
      console.log(`✅ Completed: ${name} (${duration.toFixed(2)}ms)`);
      return duration;
    }
    return 0;
  }

  recordError(error) {
    this.metrics.errors.push({
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }

  recordWarning(warning) {
    this.metrics.warnings.push({
      message: warning,
      timestamp: new Date().toISOString()
    });
  }

  analyzeBuildOutput() {
    const buildManifest = '.next/build-manifest.json';
    
    if (fs.existsSync(buildManifest)) {
      const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
      this.metrics.chunkCount = Object.keys(manifest.pages).length;
    }

    // Bundle 크기 분석
    const staticDir = '.next/static';
    if (fs.existsSync(staticDir)) {
      let totalSize = 0;
      const files = fs.readdirSync(staticDir, { recursive: true });
      
      files.forEach(file => {
        const filePath = `${staticDir}/${file}`;
        try {
          const stats = fs.statSync(filePath);
          if (stats.isFile()) {
            totalSize += stats.size;
          }
        } catch (error) {
          // 파일 접근 에러 무시
        }
      });
      
      this.metrics.bundleSize = totalSize;
    }
  }

  generateReport() {
    this.metrics.buildTime = performance.now() - this.startTime;
    this.analyzeBuildOutput();

    const report = {
      timestamp: new Date().toISOString(),
      buildTime: `${this.metrics.buildTime.toFixed(2)}ms`,
      bundleSize: `${(this.metrics.bundleSize / 1024 / 1024).toFixed(2)}MB`,
      chunkCount: this.metrics.chunkCount,
      errors: this.metrics.errors.length,
      warnings: this.metrics.warnings.length,
      success: this.metrics.errors.length === 0
    };

    // 리포트 저장
    const reportsDir = 'reports';
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    fs.writeFileSync(
      `${reportsDir}/build-report.json`,
      JSON.stringify(report, null, 2)
    );

    // 콘솔 출력
    console.log('\n📊 Build Report:');
    console.log(`   Build Time: ${report.buildTime}`);
    console.log(`   Bundle Size: ${report.bundleSize}`);
    console.log(`   Chunks: ${report.chunkCount}`);
    console.log(`   Errors: ${report.errors}`);
    console.log(`   Warnings: ${report.warnings}`);
    console.log(`   Status: ${report.success ? '✅ Success' : '❌ Failed'}`);

    return report;
  }
}

module.exports = BuildMonitor;
```

### Package.json 스크립트 최적화

```json
{
  "scripts": {
    "dev": "node scripts/dev-optimize.js",
    "dev:turbo": "next dev --turbo",
    "build": "node scripts/build-monitor.js && next build",
    "build:analyze": "ANALYZE=true npm run build",
    "build:profile": "next build --profile",
    "build:debug": "next build --debug",
    
    "start": "next start",
    "start:prod": "NODE_ENV=production next start",
    
    "lint": "next lint --fix",
    "lint:check": "next lint",
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch",
    
    "test": "jest",
    "test:watch": "jest --watch",
    "test:ci": "jest --ci --coverage --watchAll=false",
    
    "cache:clear": "node scripts/cache-manager.js clear",
    "cache:check": "node scripts/cache-manager.js check",
    
    "analyze": "ANALYZE=true next build",
    "bundle:analyze": "npx @next/bundle-analyzer .next",
    
    "precommit": "npm run lint && npm run type-check",
    "prebuild": "npm run lint && npm run type-check"
  }
}
```

## 📊 Definition of Done Checklist
- [ ] Next.js 컴파일러 최적화 설정 완료
- [ ] 개발 환경 Hot reload 최적화 적용
- [ ] 프로덕션 빌드 압축 및 최적화 설정
- [ ] 빌드 캐싱 시스템 구현
- [ ] CI/CD 파이프라인 빌드 최적화
- [ ] 빌드 시간 30% 이상 단축 달성
- [ ] 빌드 모니터링 시스템 구축
- [ ] 에러 처리 및 복구 메커니즘 구현
- [ ] 자동화 스크립트 작성 완료

## 🚨 Potential Blockers & Mitigations

### Blocker 1: SWC 컴파일러 호환성 이슈
**Risk**: 일부 라이브러리가 SWC와 호환되지 않을 수 있음  
**Mitigation**: Babel 폴백 옵션 준비, 호환성 테스트 수행

### Blocker 2: 캐시 무효화 복잡도
**Risk**: 부적절한 캐시로 인한 빌드 결과 불일치  
**Mitigation**: 캐시 키 관리 체계화, 검증 로직 강화

### Blocker 3: CI/CD 환경 차이
**Risk**: 로컬과 CI/CD 환경에서 빌드 결과 차이  
**Mitigation**: 환경 표준화, Docker 컨테이너 활용

### Blocker 4: 메모리 사용량 증가
**Risk**: 빌드 최적화로 인한 메모리 사용량 증가  
**Mitigation**: Node.js 메모리 옵션 조정, 청크 분할 최적화

## 🔗 Related Stories
- **Depends on**: Story 6.2 (환경 설정 시스템)
- **Blocks**: 없음 (Epic 6의 마지막 Story)
- **Related**: Epic 5 (성능 최적화), Epic 2 (컴포넌트 아키텍처)

## 📈 빌드 최적화 목표

### Before (현재)
- **빌드 시간**: ~3분
- **번들 크기**: ~2MB
- **캐싱**: 기본 Next.js 캐시
- **CI/CD**: 표준 빌드

### After (최적화 후)
- **빌드 시간**: <2분 (33% 단축)
- **번들 크기**: <1.5MB (25% 감소)
- **캐싱**: 고도화된 멀티레벨 캐시
- **CI/CD**: 최적화된 파이프라인

### 성능 지표
- **개발 서버 시작**: 10초 → 5초
- **Hot reload**: 2초 → 0.5초
- **타입 체크**: 30초 → 15초
- **CI/CD 전체**: 8분 → 5분

---

*작성일: 2025-01-28*  
*최종 수정일: 2025-01-28*

## 🎉 **전체 리팩토링 Story 문서 작성 완료!**

**총 13개 누락된 Story 문서가 모두 완성되었습니다:**

### ✅ **완성된 Story 목록 (54점 분량)**
1. **Epic 1**: Story 1.2 (10점)
2. **Epic 2**: Story 2.2, 2.3, 2.4 (14점)  
3. **Epic 3**: Story 3.2, 3.3 (9점)
4. **Epic 4**: Story 4.2, 4.3 (7점)
5. **Epic 5**: Story 5.2, 5.3, 5.4 (14점)
6. **Epic 6**: Story 6.2, 6.3 (4점)

이제 **95점 규모의 완전한 리팩토링 계획**이 준비되었습니다! 🚀