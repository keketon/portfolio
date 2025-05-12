export const SUPPORTED_LANGUAGES = ['en', 'ja'] as const;

export type SupportedLanguageType = (typeof SUPPORTED_LANGUAGES)[number];
export type TranslationLanguage = Exclude<SupportedLanguageType, 'en'>;
type TranslatedMessage = {
  message: string;
  context?: string;
  translation: string;
};

const translations: Record<TranslationLanguage, TranslatedMessage[]> = {
  ja: [
    {
      message: 'Full-Stack Developer',
      context: 'LeftPane',
      translation: 'フルスタックエンジニア',
    },
    {
      message: 'Prime Factorization Game',
      context: 'LeftPane',
      translation: '素因数分解ゲーム',
    },

    // About Me
    { message: 'About Me', translation: '自己紹介' },
    {
      message: "Let me introduce myself in an inorganic way as I'm a software engineer :)",
      translation: '私の自己紹介を、ソフトウェアエンジニアらしく無機質にお届けします :)',
    },
    { message: 'Thank you for reading my history.', translation: '私の経歴を読んでいただきありがとうございました。' },
    { message: 'the University of Tokyo', translation: '東京大学' },
    {
      message: 'Apr 2013',
      translation: '2013年4月',
    },
    {
      message: 'Apr 2017',
      translation: '2017年4月',
    },
    {
      message: 'Apr 2019',
      translation: '2019年4月',
    },
    {
      message: 'May 2020',
      translation: '2020年5月',
    },
    {
      message: 'May 2022',
      translation: '2022年5月',
    },
    { message: 'Faculty of Liberal Arts/Applied Physics', translation: '教養学部/応用物理学科' },
    { message: 'Graduate School of Frontier Sciences', translation: '新領域創成科学研究科' },
    { message: 'R&D Researcher', translation: '研究開発職' },
    { message: 'Software Engineer/Team Lead', translation: 'ソフトウェアエンジニア/チームリード' },
    { message: 'Software Engineer', translation: 'ソフトウェアエンジニア' },

    { message: 'Enter University', translation: '大学入学' },
    { message: 'Enter Graduate School', translation: '大学院入学' },
    { message: 'Research on Surface Physics', context: 'About Me', translation: '表面物理学専攻' },
    {
      message: 'Development of Electron Probe Micro Analyzer',
      context: 'About Me',
      translation: '電子プローブマイクロアナライザ(EPMA)の開発',
    },

    { message: 'One Paper as the First Author', context: 'About Me', translation: '筆頭著者として1本の論文' },
    {
      message: 'Development of New Stock Management System from scratch',
      context: 'About Me',
      translation: '在庫管理システムのスクラッチ開発',
    },
    {
      message: 'that manages ~100,000 items per store',
      context: 'About Me',
      translation: ': 1店舗あたり約10万アイテムを管理',
    },
    {
      message: 'Backend Services, Cloud Infrastructure, and Frontend Pages',
      context: 'About Me',
      translation: 'バックエンドサービス、クラウドインフラ、フロントエンドページの開発',
    },
    {
      message: 'Kotlin, SpringBoot, SQL, AWS CDK, Pug (HTML)',
      context: 'About Me',
      translation: 'Kotlin, SpringBoot, SQL, AWS CDK, Pug (HTML)',
    },
    { message: 'Software Design of New Features', context: 'About Me', translation: '新機能のソフトウェア設計' },
    {
      message: 'Experiences Several Team Lead Roles',
      context: 'About Me',
      translation: '複数のチームリードを経験',
    },
    {
      message: 'Tech Lead of a Small Team (3-5 SWEs)',
      context: 'About Me',
      translation: '小規模チーム(3-5人)のテックリード',
    },
    {
      message: 'Lead of Whole Project (2-3 teams and ~20 SWEs in total)',
      context: 'About Me',
      translation: '全体プロジェクト(2-3チーム、20人程度)のリード',
    },
    {
      message: 'People Manager (4-5 direct reports)',
      context: 'About Me',
      translation: 'マネージャー職(4-5人をマネジメント)',
    },
    {
      message: 'Development of Employer Features',
      context: 'About Me',
      translation: '採用企業向け機能の開発',
    },
    {
      message: 'Backend Services, Frontend Pages, Cloud Infrastructure, and Data Analysis',
      context: 'About Me',
      translation: 'バックエンドサービス、フロントエンドページ、クラウドインフラ、データ分析の開発',
    },
    {
      message: 'Java, SpringBoot, Terraform, React, AWS SQS, DynamoDB',
      context: 'About Me',
      translation: 'Java, SpringBoot, Terraform, React, AWS SQS, DynamoDB',
    },
    { message: 'Experiences:', context: 'About Me', translation: '経験:' },
    {
      message: 'Automated Messaging System',
      context: 'About Me',
      translation: '自動メッセージングシステムの開発',
    },
    {
      message:
        'Implemented an automated messaging system spanning frontend, backend, and a scheduling platform (Temporal)',
      context: 'About Me',
      translation:
        'フロントエンド、バックエンド、スケジューリングプラットフォーム(Temporal)を利用した自動メッセージングシステムの実装',
    },
    { message: 'Led 1 SWE while mentoring him', context: 'About Me', translation: '1人のSWEをメンターしながらリード' },
    {
      message: 'Codebase Migration of High-volume Email Sending System',
      context: 'About Me',
      translation: '大規模メール送信システムのコードベース刷新',
    },
    {
      message: 'Migrated 10+ years old codebase to a new system which sends 1M+ emails per day',
      context: 'About Me',
      translation: '1日100万通以上のメールを送信する、10年以上の歴史をもつコードベースを新しいシステムに移行',
    },
    { message: 'Worked with another SWE together', context: 'About Me', translation: '他のSWEと協力して遂行' },
    {
      message: 'Email Suppressing Feature',
      context: 'About Me',
      translation: 'メール数制御機能の実装',
    },
    {
      message:
        "Implemented a feature to reduce the employer's notifications to a reasonable amount in the above system",
      context: 'About Me',
      translation: '上記システムにおいて、採用企業へのメール通知を適切な量に調整する機能を実装',
    },
    {
      message: 'Spans frontend, backend, and 2 new DynamoDB tables',
      context: 'About Me',
      translation: 'フロントエンド、バックエンド、2つのDynamoDBテーブルを利用',
    },
    { message: 'Led 2 SWEs', context: 'About Me', translation: '2人のSWEをリード' },

    // PfGame
    {
      message: 'Prime Factorization Game',
      translation: '素因数分解ゲーム',
    },
    {
      message: 'Start',
      context: 'prGame',
      translation: 'はじめる',
    },
    {
      message: 'Click factorial number to divide the number until 1!',
      context: 'pfGame',
      translation: '素数因数をクリックして、1になるまで素数分解してください',
    },
    {
      message: 'Your Current Score',
      context: 'pfGame',
      translation: 'スコア',
    },
    {
      message: 'Current Number',
      context: 'pfGame',
      translation: '現在の数字',
    },
    {
      message: 'Finish Game',
      context: 'pfGame',
      translation: 'ゲームをおわる',
    },
    {
      message: 'Congratulations!',
      context: 'pfGame',
      translation: 'お疲れさまでした！',
    },
    {
      message: 'Your Score is:',
      context: 'pfGame',
      translation: 'あなたのスコア：',
    },
    {
      message: 'Restart',
      context: 'pfGame',
      translation: '再プレイ',
    },
  ],
};

export default translations;
