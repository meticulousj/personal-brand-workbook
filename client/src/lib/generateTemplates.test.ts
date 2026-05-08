import { describe, it, expect } from 'vitest';
import {
  generatePersonalBrandStatementTemplate,
  generateLinkedInChecklistTemplate,
  generateValuesWorksheetTemplate,
  generateAudienceCanvasTemplate,
  generateUVPWorksheetTemplate,
  generateStoryFrameworkTemplate,
  templates,
} from './generateTemplates';

describe('Template Generation', () => {
  it('should generate Personal Brand Statement template as PDF', async () => {
    const blob = await generatePersonalBrandStatementTemplate();
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('application/pdf');
    expect(blob.size).toBeGreaterThan(0);
  });

  it('should generate LinkedIn Checklist template as PDF', async () => {
    const blob = await generateLinkedInChecklistTemplate();
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('application/pdf');
    expect(blob.size).toBeGreaterThan(0);
  });

  it('should generate Values Worksheet template as PDF', async () => {
    const blob = await generateValuesWorksheetTemplate();
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('application/pdf');
    expect(blob.size).toBeGreaterThan(0);
  });

  it('should generate Audience Canvas template as PDF', async () => {
    const blob = await generateAudienceCanvasTemplate();
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('application/pdf');
    expect(blob.size).toBeGreaterThan(0);
  });

  it('should generate UVP Worksheet template as PDF', async () => {
    const blob = await generateUVPWorksheetTemplate();
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('application/pdf');
    expect(blob.size).toBeGreaterThan(0);
  });

  it('should generate Story Framework template as PDF', async () => {
    const blob = await generateStoryFrameworkTemplate();
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('application/pdf');
    expect(blob.size).toBeGreaterThan(0);
  });

  it('should have all templates registered', () => {
    expect(templates).toHaveProperty('personal-brand-statement');
    expect(templates).toHaveProperty('linkedin-checklist');
    expect(templates).toHaveProperty('values-worksheet');
    expect(templates).toHaveProperty('audience-canvas');
    expect(templates).toHaveProperty('uvp-worksheet');
    expect(templates).toHaveProperty('story-framework');
  });

  it('should have correct template metadata', () => {
    const template = templates['personal-brand-statement'];
    expect(template).toBeDefined();
    expect(template.name).toBe('Personal Brand Statement Template');
    expect(template.generator).toBeDefined();
    expect(typeof template.generator).toBe('function');
  });

  it('should generate PDFs with consistent structure', async () => {
    const blobs = await Promise.all([
      generatePersonalBrandStatementTemplate(),
      generateLinkedInChecklistTemplate(),
      generateValuesWorksheetTemplate(),
      generateAudienceCanvasTemplate(),
      generateUVPWorksheetTemplate(),
      generateStoryFrameworkTemplate(),
    ]);

    blobs.forEach((blob) => {
      expect(blob.type).toBe('application/pdf');
      expect(blob.size).toBeGreaterThan(1000); // PDFs should be at least 1KB
    });
  });
});
