// generated by metactl sdk gen 
package sdk

const (
	TextFilterName = "TextFilter"
)

type TextFilter struct {
    And []TextFilter `json:"and,omitempty" yaml:"and,omitempty"`
    Formatting *EnumFilter `json:"formatting,omitempty" yaml:"formatting,omitempty"`
    Language *EnumFilter `json:"language,omitempty" yaml:"language,omitempty"`
    Not []TextFilter `json:"not,omitempty" yaml:"not,omitempty"`
    Or []TextFilter `json:"or,omitempty" yaml:"or,omitempty"`
    Set *bool `json:"set,omitempty" yaml:"set,omitempty"`
    Value *StringFilter `json:"value,omitempty" yaml:"value,omitempty"`
}