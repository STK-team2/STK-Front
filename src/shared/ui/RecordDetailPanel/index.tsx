import { useState } from 'react';
import type { ReactNode } from 'react';
import * as s from './style';

export interface RecordDetailField {
  label: string;
  value: ReactNode;
  muted?: boolean;
  editable?: boolean;
  inputType?: 'text' | 'number' | 'date';
  onSave?: (value: string) => void | Promise<void>;
}

export interface RecordDetailSection {
  title: string;
  fields: RecordDetailField[];
}

interface RecordDetailPanelProps {
  title: string;
  subtitle?: string;
  sections: RecordDetailSection[];
  onClose: () => void;
  deleteLabel?: string;
  onDelete?: () => void | Promise<void>;
}

export const RecordDetailPanel = ({
  title,
  subtitle,
  sections,
  onClose,
  deleteLabel = '삭제',
  onDelete,
}: RecordDetailPanelProps) => {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  const requestClose = () => {
    setIsClosing(true);
  };

  const startEditing = (key: string, field: RecordDetailField) => {
    if (!field.editable) return;
    setEditingKey(key);
    setEditingValue(String(field.value ?? ''));
  };

  const finishEditing = async (field: RecordDetailField) => {
    if (!field.onSave) {
      setEditingKey(null);
      return;
    }

    await field.onSave(editingValue);
    setEditingKey(null);
  };

  return (
    <>
      <s.Overlay closing={isClosing} onClick={requestClose} />
      <s.Panel closing={isClosing} onAnimationEnd={() => {
        if (isClosing) onClose();
      }}>
        <s.Header>
          <s.TitleWrap>
            <s.Title>{title}</s.Title>
            {subtitle ? <s.Subtitle>{subtitle}</s.Subtitle> : null}
          </s.TitleWrap>
          <s.CloseButton type="button" aria-label="상세 닫기" onClick={requestClose}>
            ×
          </s.CloseButton>
        </s.Header>

        <s.Body>
          {sections.map((section) => (
            <s.Section key={section.title}>
              <s.SectionTitle>{section.title}</s.SectionTitle>
              <s.FieldList>
                {section.fields.map((field) => {
                  const key = `${section.title}-${field.label}`;
                  const isEditing = editingKey === key;

                  return (
                    <s.FieldRow key={key}>
                      <s.FieldLabel>{field.label}</s.FieldLabel>
                      {isEditing ? (
                        <s.FieldInput
                          autoFocus
                          type={field.inputType ?? 'text'}
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onBlur={() => void finishEditing(field)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              void finishEditing(field);
                            }
                            if (e.key === 'Escape') {
                              setEditingKey(null);
                            }
                          }}
                        />
                      ) : (
                        <s.FieldValue
                          editable={field.editable}
                          style={field.muted ? { color: '#6b7280' } : undefined}
                          onDoubleClick={() => startEditing(key, field)}
                          title={field.editable ? '더블클릭해서 수정' : undefined}
                        >
                          {field.value}
                        </s.FieldValue>
                      )}
                    </s.FieldRow>
                  );
                })}
              </s.FieldList>
            </s.Section>
          ))}
        </s.Body>

        {onDelete ? (
          <s.Footer>
            <s.DeleteButton type="button" onClick={() => void onDelete()}>
              {deleteLabel}
            </s.DeleteButton>
          </s.Footer>
        ) : null}
      </s.Panel>
    </>
  );
};
