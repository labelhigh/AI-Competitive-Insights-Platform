import type { Competitor, AnalysisReport } from "../types";
import { MOCK_AI_SUMMARY } from '../constants';

/**
 * 模擬生成 SWOT 分析摘要。
 * 在實際產品中，這裡會呼叫 AI 模型。
 * @param _userUrl - 使用者的公司 URL (模擬中未使用)。
 * @param _competitors - 所選競爭對手的列表 (模擬中未使用)。
 * @param _report - 完整的分析報告數據 (模擬中未使用)。
 * @returns 一個包含預先定義的 AI 生成摘要的字串。
 */
export const generateSwotAnalysis = async (
  _userUrl: string,
  _competitors: Competitor[],
  _report: AnalysisReport
): Promise<string> => {
  // 這是為了原型展示而模擬的 AI 分析回應。
  // 我們直接從 constants 檔案中回傳一個預先寫好的摘要，並模擬網路延遲。
  
  return new Promise(resolve => setTimeout(() => resolve(MOCK_AI_SUMMARY), 1500));
};
